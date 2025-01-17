export interface ClassData {
    // class_code: string,
    class_name: string,
    timelimit: number,
}

export interface InitialStateClassType {
    is_loading?: boolean;
    data: ClassData[];
}