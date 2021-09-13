const graphql = require("graphql");
const _ = require("lodash");
const Product = require("../models/product");
const SubDepartment = require("../models/subDepartment");
const Department = require("../models/department");
const GeneralDepartment = require("../models/generalDepartment");
console.log("../images/iphone 11.png");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
} = graphql;

const ProductType = new GraphQLObjectType({
  name: "Product",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    department: { type: GraphQLString },
    image: { type: GraphQLString },
    price: { type: GraphQLString },
    quantity: { type: GraphQLInt },
    description: { type: GraphQLString },
    brand: { type: GraphQLString },
    subDepartment: {
      type: subDepartmentType,
      resolve(parent, args) {
        return SubDepartment.findById(parent.subDepartmentId);
      },
    },
  }),
});

const subDepartmentType = new GraphQLObjectType({
  name: "SubDepartment",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    products: {
      type: new GraphQLList(ProductType),
      resolve(parent, args) {
        return Product.find({ subDepartmentId: parent.id });
      },
    },
    department: {
      type: DepartmentType,
      resolve(parent, args) {
        return Department.findById(parent.departmentId);
      },
    },
  }),
});

const DepartmentType = new GraphQLObjectType({
  name: "Department",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    subDepartments: {
      type: new GraphQLList(subDepartmentType),
      resolve(parent, args) {
        return SubDepartment.find({ DepartmentId: parent.id });
      },
    },
    generaldepartment: {
      type: GeneralDepartmentType,
      resolve(parent, args) {
        return GeneralDepartment.findById(parent.generalDepartmentId);
      },
    },
  }),
});

const GeneralDepartmentType = new GraphQLObjectType({
  name: "GeneralDepartment",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    departments: {
      type: new GraphQLList(DepartmentType),
      resolve(parent, args) {
        return Department.find({ generalDepartmentId: parent.id });
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    product: {
      type: ProductType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Product.findById(args.id);
      },
    },
    subDepartment: {
      type: subDepartmentType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return SubDepartment.findById(args.id);
      },
    },
    department: {
      type: DepartmentType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Department.findById(args.id);
      },
    },
    generalDepartment: {
      type: GeneralDepartmentType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return GeneralDepartment.findById(args.id);
      },
    },
    products: {
      type: new GraphQLList(ProductType),
      resolve(parent, args) {
        return Product.find({});
      },
    },
    subDepartments: {
      type: new GraphQLList(subDepartmentType),
      resolve(parent, args) {
        return SubDepartment.find({});
      },
    },
    Departments: {
      type: new GraphQLList(DepartmentType),
      resolve(parent, args) {
        return Department.find({});
      },
    },
    generalDepartments: {
      type: new GraphQLList(GeneralDepartmentType),
      resolve(parent, args) {
        return GeneralDepartment.find({});
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addGeneralDepartment: {
      type: GeneralDepartmentType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
      },

      resolve(parent, args) {
        let generalDepartment = new GeneralDepartment({
          name: args.name,
        });
        return generalDepartment.save();
      },
    },
    addDepartment: {
      type: DepartmentType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        generalDepartmentId: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        let department = new Department({
          name: args.name,
          generalDepartmentId: args.generalDepartmentId,
        });
        return department.save();
      },
    },
    addSubDepartment: {
      type: subDepartmentType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        departmentId: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        let subDepartment = new SubDepartment({
          name: args.name,
          departmentId: args.departmentId,
        });
        return subDepartment.save();
      },
    },
    addProduct: {
      type: ProductType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        department: { type: new GraphQLNonNull(GraphQLString) },
        image: { type: new GraphQLNonNull(GraphQLString) },
        price: { type: new GraphQLNonNull(GraphQLString) },
        quantity: { type: new GraphQLNonNull(GraphQLInt) },
        description: { type: new GraphQLNonNull(GraphQLString) },
        brand: { type: new GraphQLNonNull(GraphQLString) },
        subDepartmentId: { type: GraphQLString },
      },
      resolve(parent, args) {
        let product = new Product({
          name: args.name,
          department: args.department,
          image: args.image,
          price: args.price,
          quantity: args.quantity,
          description: args.description,
          brand: args.brand,
          subDepartmentId: args.subDepartmentId,
        });
        return product.save();
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
