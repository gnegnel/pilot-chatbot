// ================================================================================================== //
//    ___ _     _          _
//   / __| |___| |__  __ _| |
//  | (_ | / _ \ '_ \/ _` | |
//   \___|_\___/_.__/\__,_|_|
//
// ================================================================================================== //

describe("Utility functions", function() {
  // ------------------------------------------------------------------------------------------------ //
  // Get Days Since Last Monday
  // ------------------------------------------------------------------------------------------------ //
  describe("getDaysSinceLastMonday", function() {
    it("Date is not a monday.", function() {
      // Arrange.
      let date = new Date(2018, 6, 13); // Friday, Jul 13 2018.
      // Act.
      const result = getDaysSinceLastMonday({
        date: date
      });
      // Assert.
      expect(result).toBe(4);
    });

    it("Date is a monday.", function() {
      // Arrange.
      let date = new Date(2018, 6, 9); // Monday, Jul 9 2018.
      // Act.
      const result = getDaysSinceLastMonday({
        date: date
      });
      // Assert.
      expect(result).toBe(0);
    });

    it("Date is a sunday.", function() {
      // Arrange.
      let date = new Date(2018, 6, 15); // Friday, Jul 13 2018.
      // Act.
      const result = getDaysSinceLastMonday({
        date: date
      });
      // Assert.
      expect(result).toBe(7);
    });
  });
});

describe("Error handling", function() {
  // ------------------------------------------------------------------------------------------------ //
  // Find Type
  // ------------------------------------------------------------------------------------------------ //
  describe("findType", function() {
    it("is a string.", function() {
      // Arrange.
      let strings = [
        "string",
        "中文",
        "देवनागरी",
        "العربية",
        "বাংলা",
        "日本語",
        "ਪੰਜਾਬੀ",
        "한국어",
        "தமிழ்",
        new String(true),
        new String(420),
        new String(function() {
          var x = 1;
        }),
        new String([4, 2, 0]),
        new String(null),
        new String(undefined),
        new String(/\w+/),
        new String(new RegExp("\\w+")),
        new String(new Error("Error")),
        new String(new Date()),
        new String("'"),
        new String('"'),
        new String("\\"),
        new String("\n"),
        new String("\r"),
        new String("\v"),
        new String("\t"),
        new String("\b"),
        new String("\f"),
        "'",
        '"',
        "\\",
        "\n",
        "\r",
        "\v",
        "\t",
        "\b",
        "\f",
        "This is a very long string which needs " +
          "to wrap across multiple lines because " +
          "otherwise my code is unreadable.",
        "This is a very long string which needs \
          to wrap across multiple lines because \
          otherwise my code is unreadable."
      ];

      // Act.
      let stringCount = 0;
      strings.forEach(element => {
        if (findType(element) === "string") {
          stringCount++;
        }
      });

      // Assert.
      expect(stringCount).toEqual(strings.length);
    });

    it("is not a string.", function() {
      // Arrange.
      let nonStrings = [
        /\w+/,
        new RegExp("\\w+"),
        new Error("Error"),
        new Date()
      ];

      // Act.
      let stringCount = 0;
      nonStrings.forEach(element => {
        if (findType(element) === "string") {
          stringCount++;
        }
      });

      // Assert.
      expect(stringCount).toEqual(0);
    });

    it("is a number.", function() {
      // Arrange.
      let numbers = [
        1,
        -1,
        -1.01,
        1.01,
        123e5,
        123e-5,
        123e123,
        9007199254740991,
        -9007199254740991,
        9007199254740992,
        -9007199254740992,
        Number.MAX_VALUE,
        Number.MIN_VALUE,
        Number("420"),
        Number("123"),
        Number("12.3"),
        Number("123e-1"),
        Number(""),
        Number("0x11"),
        Number("0b11"),
        Number("0o11"),
        Number(new Date())
      ];

      // Act.
      let numberCount = 0;
      numbers.forEach(element => {
        if (findType(element) === "number") {
          numberCount++;
        }
      });

      // Assert.
      expect(numberCount).toEqual(numbers.length);
    });

    it("is not a number.", function() {
      // Arrange.
      let nonNumbers = [
        Number("a"),
        Number(function() {
          let a = 0;
        }),
        Number("100a"),
        Number.NaN,
        Number.NEGATIVE_INFINITY,
        Number.POSITIVE_INFINITY,
        true,
        function() {
          let x = 1;
        },
        [4, 2, 0],
        null,
        undefined,
        NaN
      ];

      // Act.
      let numberCount = 0;
      nonNumbers.forEach(element => {
        if (findType(element) === "number") {
          numberCount++;
        }
      });

      // Assert.
      expect(numberCount).toEqual(0);
    });

    it("is an array.", function() {
      // Arrange.
      let arrays = [
        [1, 2, 3],
        ["a", "b"],
        [],
        [1, "a"],
        new Array(0),
        new Array(12),
        [[1, 2], ["a", "b"]]
      ];

      // Act.
      let arrayCount = 0;
      arrays.forEach(element => {
        if (findType(element) === "array") {
          arrayCount++;
        }
      });

      // Assert.
      expect(arrayCount).toEqual(arrays.length);
    });

    it("is not an array.", function() {
      // Arrange.
      let nonArrays = [
        function() {
          var x = 1;
        },
        /\w+/,
        new RegExp("\\w+"),
        new Error("Error"),
        new Date()
      ];

      // Act.
      let arrayCount = 0;
      nonArrays.forEach(element => {
        if (findType(element) === "array") {
          arrayCount++;
        }
      });

      // Assert.
      expect(arrayCount).toEqual(0);
    });

    it("is a function.", function() {
      // Arrange.
      let functions = [
        function() {
          let a = 0;
        },
        class ExampleClass {
          constructor() {}
        }
      ];

      // Act.
      let functionCount = 0;
      functions.forEach(element => {
        if (findType(element) === "function") {
          functionCount++;
        }
      });

      // Assert.
      expect(functionCount).toEqual(functions.length);
    });

    it("is not a function.", function() {
      // Arrange.
      let nonFunctions = [
        new RegExp("\\w+"),
        new Error("Error"),
        new Date(),
        NaN,
        /\w+/
      ];

      // Act.
      let functionCount = 0;
      nonFunctions.forEach(element => {
        if (findType(element) === "function") {
          functionCount++;
        }
      });

      // Assert.
      expect(functionCount).toEqual(0);
    });

    it("is a boolean.", function() {
      // Arrange.
      let booleans = [true, false];

      // Act.
      let booleanCount = 0;
      booleans.forEach(element => {
        if (findType(element) === "boolean") {
          booleanCount++;
        }
      });

      // Assert.
      expect(booleanCount).toEqual(booleans.length);
    });

    it("is not a boolean.", function() {
      // Arrange.
      let nonBooleans = [
        new Boolean(0),
        new Boolean(null),
        new Boolean(false),
        new Boolean(NaN),
        new Boolean(undefined),
        0,
        null,
        NaN,
        undefined
      ];

      // Act.
      let booleanCount = 0;
      nonBooleans.forEach(element => {
        if (findType(element) === "boolean") {
          booleanCount++;
        }
      });

      // Assert.
      expect(booleanCount).toEqual(0);
    });

    it("is a regular expression.", function() {
      // Arrange.
      let regExps = [/\w+/, new RegExp("\\w+")];

      // Act.
      let regExpCount = 0;
      regExps.forEach(element => {
        if (findType(element) === "regexp") {
          regExpCount++;
        }
      });

      // Assert.
      expect(regExpCount).toEqual(regExps.length);
    });

    it("is not a regular expression.", function() {
      // Arrange.
      let nonRegExps = [
        null,
        undefined,
        new Error("Error"),
        new Date(),
        NaN,
        [4, 2, 0]
      ];

      // Act.
      let regExpCount = 0;
      nonRegExps.forEach(element => {
        if (findType(element) === "regexp") {
          regExpCount++;
        }
      });

      // Assert.
      expect(regExpCount).toEqual(0);
    });

    it("is an error.", function() {
      // Arrange.
      class CustomError extends Error {
        constructor(...params) {
          super(...params);
        }
      }

      let errors = [
        new Error("Error"),
        Error("Error"),
        new Error(),
        Error(),
        new EvalError("Error"),
        new InternalError("Error"),
        new RangeError("Error"),
        new ReferenceError("Error"),
        new SyntaxError("Error"),
        new ReferenceError("Error"),
        new TypeError("Error"),
        new URIError("Error"),
        new CustomError("Error")
      ];

      // Act.
      let errorCount = 0;
      errors.forEach(element => {
        if (findType(element) === "error") {
          errorCount++;
        }
      });

      // Assert.
      expect(errorCount).toEqual(errors.length);
    });

    it("is not an error.", function() {
      // Arrange.
      let nonErrors = [
        class CustomError extends Error {
          constructor(...params) {
            super(...params);
          }
        }
      ];

      // Act.
      let errorCount = 0;
      nonErrors.forEach(element => {
        if (findType(element) === "error") {
          errorCount++;
        }
      });

      // Assert.
      expect(errorCount).toEqual(0);
    });

    it("is a date.", function() {
      // Arrange.
      let dates = [
        new Date(),
        new Date("2013-03-01T01:10:00"),
        new Date(2014, 1, 1),
        new Date(new Date())
      ];

      // Act.
      let dateCount = 0;
      dates.forEach(element => {
        if (findType(element) === "date") {
          dateCount++;
        }
      });

      // Assert.
      expect(dateCount).toEqual(dates.length);
    });

    it("is not a date.", function() {
      // Arrange.
      let nonDates = [
        new Date("Example meaningless text. /&%$·=?¿"),
        new Date(new Error())
      ];

      // Act.
      let dateCount = 0;
      nonDates.forEach(element => {
        if (findType(element) === "date") {
          dateCount++;
        }
      });

      // Assert.
      expect(dateCount).toEqual(0);
    });
  });

  // ------------------------------------------------------------------------------------------------ //
  // Validate
  // ------------------------------------------------------------------------------------------------ //
  describe("validate", function() {
    it("returns false when values and types are not the same length.", function() {
      // Arrange.
      let values = [1, 2, 3];
      let types = ["number", "number"];

      // Act.
      let result = validate({
        values: values,
        types: types
      });

      // Assert.
      expect(result).toBe(false);
    });

    it("returns false when values and types do not match.", function() {
      // Arrange.
      let values = [1, 2, 3];
      let types = ["string", "string", "error"];

      // Act.
      let result = validate({
        values: values,
        types: types
      });

      // Assert.
      expect(result).toBe(false);
    });

    it("accepts an array when all data types match", function() {
      // Arrange.
      let values = [
        "string",
        420,
        [4, 2, 0],
        function() {
          let a = 420;
        },
        false,
        /\w+/,
        new Error("Error"),
        new Date()
      ];

      let types = [
        "string",
        "number",
        "array",
        "function",
        "boolean",
        "regexp",
        "error",
        "date"
      ];

      // Act.
      let result = validate({
        values: values,
        types: types
      });

      // Assert.
      expect(result).toBe(true);
    });
  });
});

// ================================================================================================== //
//   _   _
//  | | | |___ ___ _ _
//  | |_| (_-</ -_) '_|
//   \___//__/\___|_|
//
// ================================================================================================== //

describe("User functions", function() {
  describe("addTicket", function() {
    it("adds a ticket to the user's array of ticket", function() {
      // Arrange
      let ticket = new Ticket({
        timestamp: new Date(),
        url: "www.example.com/image.jpg"
      });
      let user = new User({
        id:12345678,
        gender: "male"
      });
      // Act
      user.addTicket({ticket: ticket});
      // Assert
      expect(ticket).toBe(user.tickets[0]);
    });
  });
});

// ================================================================================================== //
//    ___
//   / __|__ _ _ __  ___
//  | (_ / _` | '  \/ -_)
//   \___\__,_|_|_|_\___|
//
// ================================================================================================== //

// describe("Game functions", function() {
//   describe("checkLevelUp()", function() {
//     it("returns true if the parameters mean a level up", function() {
//       // Arrange.
//       let level = 4;
//       let weekStreak = 3:
//       // Act.

//       // Assert. 

//     });
//   });
// });

// ================================================================================================== //
//   _____ _    _       _
//  |_   _(_)__| |_____| |_
//    | | | / _| / / -_)  _|
//    |_| |_\__|_\_\___|\__|
//
// ================================================================================================== //

// describe("Ticket functions", function() {
//   describe("getDaysSinceLastMonday()", function() {
//     it("Write Your Test Expectation Here", function() {
//       // Arrange.
//       let bool = false;
//       // Act.
//       const result = getOpposite(bool);
//       // Assert.
//       expect(result).toBe(true);
//     });
//   });
// });
