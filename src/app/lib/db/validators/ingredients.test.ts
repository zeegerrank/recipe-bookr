import { describe, it, expect } from "vitest";
import {
  ingredientCreateValidator,
  ingredientUpdateValidator,
} from "./ingredients";

describe("IngredientCreateValidator", () => {
  // Expected
  it("accept valid ingredient", () => {
    const name = "potato";
    const data = { id: name, name, gPerMl: 0.59, defaultUnit: "g" };
    const parsed = ingredientCreateValidator.parse(data);
    expect(parsed).toMatchObject(data);
  });

  //   Weired
  it("reject if density is string", () => {
    const name = "potato";
    const bad = { id: name, name, gPerMl: "0.59", defaultUnit: "g" };
    expect(() => ingredientCreateValidator.parse(bad)).toThrow();
  });
  it("reject if unit is not one of the options", () => {
    const name = "potato";
    const bad = { id: name, name, gPerMl: 0.59, defaultUnit: "km" };
    expect(() => ingredientCreateValidator.parse(bad)).toThrow();
  });
  it("reject if density is negative numbers", () => {
    const name = "potato";
    const bad = { id: name, name, gPerMl: -0.59, defaultUnit: "g" };
    expect(() => ingredientCreateValidator.parse(bad)).toThrow();
  });
  it("reject if density is zero", () => {
    const name = "potato";
    const bad = { id: name, name, gPerMl: 0, defaultUnit: "g" };
    expect(() => ingredientCreateValidator.parse(bad)).toThrow();
  });

  //   Accident
  it("reject if name is empty", () => {
    const name = "";
    const bad = { id: name, name, gPerMl: 0.59, defaultUnit: "g" };
    expect(() => ingredientCreateValidator.parse(bad)).toThrow();
  });
  it("reject if name is longer than 64 chars", () => {
    const name =
      "Loremipsumdolorsitamet,consecteturadipiscingelit.Doneciaculisfelisinnunctincidunt,idconsectetureratultrices.Nambibendum,elitutornaresagittis,turpisauguepharetraest,nectincidunttortorauguenecmi.Crastristiqueeroslectus,tristiquesagittisliberotempusplacerat.Aeneanelementumaccumsantempus.Maecenasnonnislamialiquetdignissim.Donecodiolibero,cursusvitaemaximuseu,lobortissedest.Vestibulumdapibusconsequatlectusnecpulvinar.Suspendisselaciniaeroslectus,velaliquampurustempussitamet.Mauristinciduntsemleo,sitametporttitortellusornaresed.Curabiturnonarcueunisiconsecteturvenenatisnecacpurus";

    const bad = { id: name, name, gPerMl: 0.59, defaultUnit: "g" };
    expect(() => ingredientCreateValidator.parse(bad)).toThrow();
  });
  it("reject if unit is not provided", () => {
    const name = "potato";
    const bad = { id: name, name, gPerMl: 0.59, defaultUnit: "" };
    expect(() => ingredientCreateValidator.parse(bad)).toThrow();
  });
});

describe("ingredientUpdateValidator", () => {
  // Expected
  it("accept valid ingredient", () => {
    const data = { name: "potato", gPerMl: 0.59, defaultUnit: "g" };
    const parsed = ingredientUpdateValidator.parse(data);
    expect(parsed).toMatchObject(data);
  });

  //   Weird
  it("reject if density is string", () => {
    const bad = { name: "potato", gPerMl: "0.59", defaultUnit: "g" };
    expect(() => ingredientUpdateValidator.parse(bad)).toThrow();
  });
  it("reject if unit is not on of the options", () => {
    const bad = { name: "potato", gPerMl: 0.59, defaultUnit: "usd" };
    expect(() => ingredientUpdateValidator.parse(bad)).toThrow();
  });
  it("reject if density is negative numbers", () => {
    const bad = { name: "potato", gPerMl: -0.59, defaultUnit: "g" };
    expect(() => ingredientUpdateValidator.parse(bad)).toThrow();
  });
  it("reject if density is zero", () => {
    const bad = { name: "potato", gPerMl: 0, defaultUnit: "g" };
    expect(() => ingredientUpdateValidator.parse(bad)).toThrow();
  });

  // Accident
  it("reject if name is not provided", () => {
    const bad = { name: "", gPerMl: 0.59, defaultUnit: "g" };
    expect(() => ingredientUpdateValidator.parse(bad)).toThrow();
  });
  it("reject if name is more than 64 chars", () => {
    const bad = {
      name: "Loremipsumdolorsitamet,consecteturadipiscingelit.Doneciaculisfelisinnunctincidunt,idconsectetureratultrices.Nambibendum,elitutornaresagittis,turpisauguepharetraest,nectincidunttortorauguenecmi.Crastristiqueeroslectus,tristiquesagittisliberotempusplacerat.Aeneanelementumaccumsantempus.Maecenasnonnislamialiquetdignissim.Donecodiolibero,cursusvitaemaximuseu,lobortissedest.Vestibulumdapibusconsequatlectusnecpulvinar.Suspendisselaciniaeroslectus,velaliquampurustempussitamet.Mauristinciduntsemleo,sitametporttitortellusornaresed.Curabiturnonarcueunisiconsecteturvenenatisnecacpurus",
      gPerMl: 0.59,
      defaultUnit: "g",
    };
    expect(() => ingredientUpdateValidator.parse(bad)).toThrow();
  });
  it("reject if unit is not provided", () => {
    const bad = { name: "potato", gPerMl: 0.59, defaultUnit: "" };
    expect(() => ingredientUpdateValidator.parse(bad)).toThrow();
  });
});
