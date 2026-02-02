/**
 * Image Compression Composable
 *
 * Handles image compression and conversion to Base64
 * Optimized for mobile uploads and Firestore storage
 */

// Configuration
const MAX_WIDTH = 800
const MAX_HEIGHT = 800
const QUALITY = 0.7 // 70% quality
const MAX_FILE_SIZE = 500 * 1024 // 500KB after compression

export interface CompressionResult {
    base64: string
    originalSize: number
    compressedSize: number
    width: number
    height: number
}

export interface CompressionError {
    message: string
    code: 'FILE_TOO_LARGE' | 'INVALID_TYPE' | 'COMPRESSION_FAILED'
}

/**
 * Check if file is a valid image
 */
function isValidImageType(file: File): boolean {
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif']
    return validTypes.includes(file.type)
}

/**
 * Load image from file
 */
function loadImage(file: File): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
        const img = new Image()
        img.onload = () => resolve(img)
        img.onerror = () => reject(new Error('Failed to load image'))

        const reader = new FileReader()
        reader.onload = (e) => {
            img.src = e.target?.result as string
        }
        reader.onerror = () => reject(new Error('Failed to read file'))
        reader.readAsDataURL(file)
    })
}

/**
 * Calculate new dimensions maintaining aspect ratio
 */
function calculateDimensions(
    width: number,
    height: number,
    maxWidth: number,
    maxHeight: number
): { width: number; height: number } {
    let newWidth = width
    let newHeight = height

    if (width > maxWidth) {
        newWidth = maxWidth
        newHeight = (height * maxWidth) / width
    }

    if (newHeight > maxHeight) {
        newHeight = maxHeight
        newWidth = (width * maxHeight) / height
    }

    return {
        width: Math.round(newWidth),
        height: Math.round(newHeight),
    }
}

/**
 * Compress image using canvas
 */
function compressImage(
    img: HTMLImageElement,
    maxWidth: number,
    maxHeight: number,
    quality: number
): string {
    const { width, height } = calculateDimensions(img.width, img.height, maxWidth, maxHeight)

    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height

    const ctx = canvas.getContext('2d')
    if (!ctx) {
        throw new Error('Failed to get canvas context')
    }

    // Use high quality image rendering
    ctx.imageSmoothingEnabled = true
    ctx.imageSmoothingQuality = 'high'

    // Draw image
    ctx.drawImage(img, 0, 0, width, height)

    // Convert to JPEG for better compression
    return canvas.toDataURL('image/jpeg', quality)
}

/**
 * Get base64 size in bytes
 */
function getBase64Size(base64: string): number {
    // Remove data URL prefix
    const base64Data = base64.split(',')[1] || base64
    // Calculate size: base64 is ~4/3 larger than binary
    return Math.round((base64Data.length * 3) / 4)
}

export function useImageCompression() {
    /**
     * Compress an image file and return Base64
     */
    async function compressFile(
        file: File,
        options?: {
            maxWidth?: number
            maxHeight?: number
            quality?: number
        }
    ): Promise<CompressionResult> {
        const maxWidth = options?.maxWidth ?? MAX_WIDTH
        const maxHeight = options?.maxHeight ?? MAX_HEIGHT
        const quality = options?.quality ?? QUALITY

        // Validate file type
        if (!isValidImageType(file)) {
            throw {
                message: 'نوع الملف غير مدعوم. يرجى استخدام صورة JPEG أو PNG',
                code: 'INVALID_TYPE',
            } as CompressionError
        }

        try {
            // Load image
            const img = await loadImage(file)

            // Compress
            const base64 = compressImage(img, maxWidth, maxHeight, quality)
            const compressedSize = getBase64Size(base64)

            // Check if still too large
            if (compressedSize > MAX_FILE_SIZE) {
                // Try with lower quality
                const lowerQualityBase64 = compressImage(img, maxWidth, maxHeight, quality * 0.7)
                const lowerSize = getBase64Size(lowerQualityBase64)

                if (lowerSize > MAX_FILE_SIZE) {
                    throw {
                        message: 'الصورة كبيرة جداً. يرجى اختيار صورة أصغر',
                        code: 'FILE_TOO_LARGE',
                    } as CompressionError
                }

                return {
                    base64: lowerQualityBase64,
                    originalSize: file.size,
                    compressedSize: lowerSize,
                    width: img.width,
                    height: img.height,
                }
            }

            return {
                base64,
                originalSize: file.size,
                compressedSize,
                width: img.width,
                height: img.height,
            }
        } catch (error) {
            if ((error as CompressionError).code) {
                throw error
            }
            throw {
                message: 'فشل في ضغط الصورة',
                code: 'COMPRESSION_FAILED',
            } as CompressionError
        }
    }

    /**
     * Format file size for display
     */
    function formatFileSize(bytes: number): string {
        if (bytes < 1024) return `${bytes} B`
        if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
        return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
    }

    /**
     * Check if a string is a valid base64 image
     */
    function isValidBase64Image(str: string): boolean {
        return str.startsWith('data:image/')
    }

    return {
        compressFile,
        formatFileSize,
        isValidBase64Image,
        MAX_FILE_SIZE,
    }
}
