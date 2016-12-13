export class Path {
    private name: string;
    private files: string[];
    private dirs: Path[];
    private parent: Path;

    constructor(name: string, parent: Path) { 
        this.name = name;
        this.files = [];
        this.dirs = [];
        this.parent = parent;
    }

    private getDir(name: string): Path {
        if (this.name === name) {
            return this;
        }
        else {
            return this.dirs.find(dir => dir.name === name);
        }
    }

    add(file: string): void {
        if (file.split('/').length === 1) {
            this.addFile(file);
        }
        else {
            this.addDir(file);
        }
    }

    private addFile(file: string): void {
        this.files.push(file);
    }

    private addDir(file: string): void {
        let fs = file.split('/');
        let fst = fs[0];
        let rest = fs.slice(1);

        let dir = this.getDir(fst);
        if (!dir) {
            dir = new Path(fst, this);
            this.dirs.push(dir);
        }
        dir.add(rest.join('/'));
    }

    getParentPath(): string {
        let parents: string[] = [this.name];
        let start: Path = this.parent;

        while(start && start.name !== '/') {
            parents.push(start.name);
            start = start.parent;
        }

        return parents.reverse().join("/");
    }
}