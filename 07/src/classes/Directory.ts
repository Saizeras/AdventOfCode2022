import File from "./File"

export default class Directory{

    name: string
    parent: Directory | null = null
    subdirectories: Directory[]
    files: File[]
    size: number

    constructor (
        name:string, 
        subdirectories: Directory[] = [],
        files: File[] = [],

    ){
        this.name = name
        this.subdirectories = subdirectories
        this.files = files
        this.size = 0
    }

    str = (previousSpaces: number = 0) => {
        let spaces = ""
        let composedStr = `- ${this.name} (Directory, Size=${this.size})\n`

        for (let i = 0; i< previousSpaces; i++) spaces = spaces + " "

        if (this.subdirectories.length > 0) this.subdirectories.forEach((subdirectory: Directory) =>{
            composedStr = composedStr + `${spaces}  ${subdirectory.str(previousSpaces+2)}`
        })
        
        if (this.files.length > 0) this.files.forEach((file: File) =>{
            composedStr = composedStr + `${file.str(previousSpaces + 2 )}\n`
        })

        return composedStr

    }

    addFile = (file: File) => {
        
        file.parent = this
        this.files.push(file)
    }

    addSubdirectory = (subdirectory: Directory) => {
        
        subdirectory.parent = this
        this.subdirectories.push(subdirectory)

    }

    getSubdirectory = (name: string) => {
        return this.subdirectories.find((subdirectory)=> subdirectory.name === name)
    }
    
    getFile = (name: string) => {
        return this.files.find((file)=> file.name === name)
    }

    updateSize = () => {
        
        const currentLocation = this.files.length !==0 ? this.files
            .map((file) => file.size)
            .reduce((prev, curr) => prev + curr)
            : 0

        const recursiveSize = this.subdirectories.length !==0 ? this.subdirectories
                .map((subdirectory) => subdirectory.updateSize())
                .reduce((prev, curr) => prev + curr)
                : 0

        const total: number = currentLocation + recursiveSize

        this.size = total
        return total

    }
}