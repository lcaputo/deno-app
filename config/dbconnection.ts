import {
  PostgresConnector,
  Database,
  Model,
  DataTypes,
  Relationships,
} from "../deps.ts";

const connection = new PostgresConnector({
  host: "127.0.0.1",
  username: "admin",
  password: "admin",
  database: "denodb",
});

export const db = new Database(connection);

export class User extends Model {
  static table = "users";
  static timestamps: true;
  static fields = {
    idUser: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.BIG_INTEGER,
    },
    email: {
      type: DataTypes.STRING,
      length: 50,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      length: 50,
      allowNull: false,
    },
  };
}

export class Person extends Model {
  static table = "people";
  static timestamps: true;
  static fields = {
    idPerson: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.BIG_INTEGER,
    },
    name: {
      type: DataTypes.STRING,
      length: 50,
      allowNull: false,
    },
    docType: {
      type: DataTypes.STRING,
      status: DataTypes.enum(["CC", "PP", "PPT", "TI"]),
      allowNull: false,
    },
    document: {
      type: DataTypes.BIG_INTEGER,
      //unique: true,
    },
  };
  static Company() {
    return this.hasMany(Company);
  }
}

export class Company extends Model {
  static table = "companies";
  static timestamps: true;
  static fields = {
    idCompany: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.BIG_INTEGER,
    },
    name: {
      type: DataTypes.STRING,
      length: 50,
      allowNull: false,
    },
    nit: {
      type: DataTypes.STRING,
      status: DataTypes.enum(["CC", "PP", "PPT", "TI"]),
      allowNull: false,
    },
    owner: {
      type: DataTypes.STRING,
      length: 50,
    },
  };
  static Person() {
    return this.hasMany(Person);
  }
}

export class ARL extends Model {
  static table = "ARLs";
  static timestamps: true;
  static fields = {
    idARL: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.BIG_INTEGER,
    },
    name: {
      type: DataTypes.STRING,
      length: 50,
      allowNull: false,
    },
  };
}

export class Course extends Model {
  static table = "courses";
  static timestamps: true;
  static fields = {
    idCourse: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.BIG_INTEGER
    },
    name: {
      type: DataTypes.STRING,
      length: 50,
      allowNull: false,
    },
    intensity: {
      type: DataTypes.INTEGER,
    },
    identifier: {
      type: DataTypes.STRING,
      length: 20, 
    },
  };
}

export class Certificate extends Model {
  static table = "certificates";
  static timestamps: true;
  static fields = {
    idCertificate: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER
    },
    expedition: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    identifier: {
      type: DataTypes.STRING,
      length: 20,
    },
  };
}


const CompanyPerson = Relationships.manyToMany(Company, Person);
//const ARLPerson = Relationships.belongsTo(ARL, Person);
//const CouseCertificate = Relationships.belongsTo(Course, Certificate)
//const PersonCertificate = Relationships.belongsTo(Person, Certificate)
  

db.link([User, CompanyPerson, Company, Person, ARL, Course, Certificate]);
