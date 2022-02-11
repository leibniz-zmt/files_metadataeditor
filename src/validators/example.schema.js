"use strict";
module.exports = validate20;
module.exports.default = validate20;
const schema22 = {"type":"object","properties":{"name":{"type":"string","minLength":3,"description":"Please enter your name"},"vegetarian":{"type":"boolean"},"birthDate":{"type":"string","format":"date"},"nationality":{"type":"string","enum":["DE","IT","JP","US","RU","Other"]},"personalData":{"type":"object","properties":{"age":{"type":"integer","description":"Please enter your age."},"height":{"type":"number"},"drivingSkill":{"type":"number","maximum":10,"minimum":1,"default":7}},"required":["age","height"]},"occupation":{"type":"string"},"postalCode":{"type":"string","maxLength":5}},"required":["occupation","nationality"]};
const func8 = require("ajv/dist/runtime/ucs2length").default;
const func0 = require("ajv/dist/runtime/equal").default;
const formats0 = require("ajv-formats/dist/formats").fullFormats.date;

function validate20(data, {instancePath="", parentData, parentDataProperty, rootData=data}={}){
let vErrors = null;
let errors = 0;
const _errs0 = errors;
if(data && typeof data == "object" && !Array.isArray(data)){
if(data.occupation === undefined){
const err0 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "occupation"},message:"must have required property '"+"occupation"+"'"};
if(vErrors === null){
vErrors = [err0];
}
else {
vErrors.push(err0);
}
errors++;
}
if(data.nationality === undefined){
const err1 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "nationality"},message:"must have required property '"+"nationality"+"'"};
if(vErrors === null){
vErrors = [err1];
}
else {
vErrors.push(err1);
}
errors++;
}
if(data.name !== undefined){
let data0 = data.name;
const _errs1 = errors;
const _errs2 = errors;
if(typeof data0 === "string"){
if(func8(data0) < 3){
const err2 = {instancePath:instancePath+"/name",schemaPath:"#/properties/name/minLength",keyword:"minLength",params:{limit: 3},message:"must NOT have fewer than 3 characters"};
if(vErrors === null){
vErrors = [err2];
}
else {
vErrors.push(err2);
}
errors++;
}
}
else {
const err3 = {instancePath:instancePath+"/name",schemaPath:"#/properties/name/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err3];
}
else {
vErrors.push(err3);
}
errors++;
}
var valid0 = _errs1 === errors;
}
if(data.vegetarian !== undefined){
let data1 = data.vegetarian;
const _errs3 = errors;
if(typeof data1 !== "boolean"){
const err4 = {instancePath:instancePath+"/vegetarian",schemaPath:"#/properties/vegetarian/type",keyword:"type",params:{type: "boolean"},message:"must be boolean"};
if(vErrors === null){
vErrors = [err4];
}
else {
vErrors.push(err4);
}
errors++;
}
const _errs4 = errors;
var valid0 = _errs3 === errors;
}
if(data.birthDate !== undefined){
let data2 = data.birthDate;
const _errs5 = errors;
const _errs6 = errors;
if((typeof data2 == "number") && (isFinite(data2))){
}
if(typeof data2 === "string"){
if(!(formats0.validate(data2))){
const err5 = {instancePath:instancePath+"/birthDate",schemaPath:"#/properties/birthDate/format",keyword:"format",params:{format: "date"},message:"must match format \""+"date"+"\""};
if(vErrors === null){
vErrors = [err5];
}
else {
vErrors.push(err5);
}
errors++;
}
}
else {
const err6 = {instancePath:instancePath+"/birthDate",schemaPath:"#/properties/birthDate/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err6];
}
else {
vErrors.push(err6);
}
errors++;
}
var valid0 = _errs5 === errors;
}
if(data.nationality !== undefined){
let data3 = data.nationality;
const _errs7 = errors;
if(typeof data3 !== "string"){
const err7 = {instancePath:instancePath+"/nationality",schemaPath:"#/properties/nationality/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err7];
}
else {
vErrors.push(err7);
}
errors++;
}
const _errs8 = errors;
const vSchema0 = schema22.properties.nationality.enum;
if(!((((((data3 === "DE") || (data3 === "IT")) || (data3 === "JP")) || (data3 === "US")) || (data3 === "RU")) || (data3 === "Other"))){
const err8 = {instancePath:instancePath+"/nationality",schemaPath:"#/properties/nationality/enum",keyword:"enum",params:{allowedValues: schema22.properties.nationality.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err8];
}
else {
vErrors.push(err8);
}
errors++;
}
var valid0 = _errs7 === errors;
}
if(data.personalData !== undefined){
let data4 = data.personalData;
const _errs9 = errors;
const _errs10 = errors;
if(data4 && typeof data4 == "object" && !Array.isArray(data4)){
if(data4.age === undefined){
const err9 = {instancePath:instancePath+"/personalData",schemaPath:"#/properties/personalData/required",keyword:"required",params:{missingProperty: "age"},message:"must have required property '"+"age"+"'"};
if(vErrors === null){
vErrors = [err9];
}
else {
vErrors.push(err9);
}
errors++;
}
if(data4.height === undefined){
const err10 = {instancePath:instancePath+"/personalData",schemaPath:"#/properties/personalData/required",keyword:"required",params:{missingProperty: "height"},message:"must have required property '"+"height"+"'"};
if(vErrors === null){
vErrors = [err10];
}
else {
vErrors.push(err10);
}
errors++;
}
if(data4.age !== undefined){
let data5 = data4.age;
const _errs11 = errors;
if(!(((typeof data5 == "number") && (!(data5 % 1) && !isNaN(data5))) && (isFinite(data5)))){
const err11 = {instancePath:instancePath+"/personalData/age",schemaPath:"#/properties/personalData/properties/age/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err11];
}
else {
vErrors.push(err11);
}
errors++;
}
const _errs12 = errors;
var valid1 = _errs11 === errors;
}
if(data4.height !== undefined){
let data6 = data4.height;
const _errs13 = errors;
if(!((typeof data6 == "number") && (isFinite(data6)))){
const err12 = {instancePath:instancePath+"/personalData/height",schemaPath:"#/properties/personalData/properties/height/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err12];
}
else {
vErrors.push(err12);
}
errors++;
}
const _errs14 = errors;
var valid1 = _errs13 === errors;
}
if(data4.drivingSkill !== undefined){
let data7 = data4.drivingSkill;
const _errs15 = errors;
const _errs16 = errors;
if((typeof data7 == "number") && (isFinite(data7))){
if(data7 > 10 || isNaN(data7)){
const err13 = {instancePath:instancePath+"/personalData/drivingSkill",schemaPath:"#/properties/personalData/properties/drivingSkill/maximum",keyword:"maximum",params:{comparison: "<=", limit: 10},message:"must be <= 10"};
if(vErrors === null){
vErrors = [err13];
}
else {
vErrors.push(err13);
}
errors++;
}
if(data7 < 1 || isNaN(data7)){
const err14 = {instancePath:instancePath+"/personalData/drivingSkill",schemaPath:"#/properties/personalData/properties/drivingSkill/minimum",keyword:"minimum",params:{comparison: ">=", limit: 1},message:"must be >= 1"};
if(vErrors === null){
vErrors = [err14];
}
else {
vErrors.push(err14);
}
errors++;
}
}
else {
const err15 = {instancePath:instancePath+"/personalData/drivingSkill",schemaPath:"#/properties/personalData/properties/drivingSkill/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err15];
}
else {
vErrors.push(err15);
}
errors++;
}
var valid1 = _errs15 === errors;
}
}
else {
const err16 = {instancePath:instancePath+"/personalData",schemaPath:"#/properties/personalData/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err16];
}
else {
vErrors.push(err16);
}
errors++;
}
var valid0 = _errs9 === errors;
}
if(data.occupation !== undefined){
let data8 = data.occupation;
const _errs17 = errors;
if(typeof data8 !== "string"){
const err17 = {instancePath:instancePath+"/occupation",schemaPath:"#/properties/occupation/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err17];
}
else {
vErrors.push(err17);
}
errors++;
}
const _errs18 = errors;
var valid0 = _errs17 === errors;
}
if(data.postalCode !== undefined){
let data9 = data.postalCode;
const _errs19 = errors;
const _errs20 = errors;
if(typeof data9 === "string"){
if(func8(data9) > 5){
const err18 = {instancePath:instancePath+"/postalCode",schemaPath:"#/properties/postalCode/maxLength",keyword:"maxLength",params:{limit: 5},message:"must NOT have more than 5 characters"};
if(vErrors === null){
vErrors = [err18];
}
else {
vErrors.push(err18);
}
errors++;
}
}
else {
const err19 = {instancePath:instancePath+"/postalCode",schemaPath:"#/properties/postalCode/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err19];
}
else {
vErrors.push(err19);
}
errors++;
}
var valid0 = _errs19 === errors;
}
}
else {
const err20 = {instancePath,schemaPath:"#/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err20];
}
else {
vErrors.push(err20);
}
errors++;
}
validate20.errors = vErrors;
return errors === 0;
}
