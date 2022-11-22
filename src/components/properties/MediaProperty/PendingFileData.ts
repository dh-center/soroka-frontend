type ProgressCallback = ((percent: number) => void) | undefined

export default class PendingFileData {
    id

    file

    uploadPercent = 0

    private onProgressCallback: ProgressCallback = undefined

    constructor(id: string, file: File) {
        this.id = id
        this.file = file
    }

    subscribeToProgress(callback: ProgressCallback) {
        this.onProgressCallback = callback
    }

    unsubscribeFromProgress() {
        this.onProgressCallback = undefined
    }

    onUploadProgress(progressEvent: ProgressEvent) {
        const { loaded, total } = progressEvent
        const percent = Math.floor((loaded * 100) / total)

        if (this.onProgressCallback) {
            this.onProgressCallback(percent)
        }
    }
}
