/**
 * @author Conner
 *
 * All-in-one username checker written in Deno
 */

/* Dependencies */
import Checker from "./src/checker.js";

/* Variables */
let args = Deno.args;
let types = ["steamid", "steamgroup", "fortnite", "snapchat"];

if(args.length > 0) {
  if(types.indexOf(args[0].toLowerCase()) !== -1) {
    console.log(`🦕 - Checking ${args[0].toUpperCase()}`);

    let C = new Checker(args[0].toLowerCase());
    C.start();
  } else {
    console.log(`🦕 - Invalid type\nTypes: ${types.toString().replace(/\,/g, ", ")}`);
  }
} else {
  console.log(`🦕 - Invalid arguments\ndeno run -A main.js [type]`);
}
