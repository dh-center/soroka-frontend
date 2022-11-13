export default class UploadedFileData {
    public id

    public name

    public type

    public size

    constructor(id: string, name: string, type: string, size: number) {
        this.id = id
        this.name = name
        this.type = type
        this.size = size
    }
}
