export class Patient {

    name: string;
    lastName: string;
    secondLastName: string;
    gender: string;
    ci: string;
    birthDate: Date;
    phone: string;

    constructor(name: string,
        lastName: string,
        secondLastName: string,
        ci: string,
        birthDate: Date,
        gender: string,
        phone: string) {
        this.name = name;
        this.lastName = lastName;
        this.secondLastName = secondLastName;
        this.ci = ci;
        this.birthDate = birthDate;
        this.gender = gender;
        this.phone = phone;
    }
}