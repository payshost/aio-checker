/**
 * @author Conner
 */

/**
 TODO: Add more services
 TODO: Try to clean up and improve code
*/

/* Variables */
let set = new Set(), i = 0;

/* Checker Class */
export default class Checker {
  constructor(type) {
    this.type = type;
  }

  start() {
    let input = Deno.readTextFileSync("./input.txt").replace(/\r/g, "").split("\n");

    for(let line in input) {
      if(input[line] !== "" && input[line].length > 3 && input[line].length < 16 && !new RegExp(/['-,.]/g).test(input[line])) {
        set.add(input[line]);
      }
    }

    console.log(`🦕 - Filtered ${input.length - set.size} lines.`);
    console.log(`🦕 - Checking ${set.size} lines | type = ${this.type.toUpperCase()}`);

    switch (this.type.toLowerCase()) {
      case "steamid": {
        for(let id of set) {
          setTimeout(() => {
            this.checkSteamID(id);
          }, i * 25);

          i++;
        }
        break;
      }
      case "steamgroup": {
        for(let url of set) {
          setTimeout(() => {
            this.checkGroupURL(url);
          }, i * 25);

          i++;
        }
        break;
      }
      case "fortnite": {
        for(let usr of set) {
          setTimeout(() => {
            this.checkFortniteUsername(usr);
          }, i * 25);

          i++;
        }
        break;
      }
    }
  }

  checkSteamID(id) {
    fetch(`https://steamcommunity.com/id/${id}`).then(async r => {
      let text = await r.text();

      if(text.indexOf("The specified profile could not be found.") !== -1) {
        console.log(`🦕 - id: ${id} | status = available | type = ${this.type.toUpperCase()}`);
        Deno.writeTextFileSync("./out/output-steamid.txt", `${id}\n`, {append: true});
      } else {
        console.log(`🦕 - id: ${id} | status = taken | type = ${this.type.toUpperCase()}`);
      }
    }).catch(() => {
      this.checkSteamID(id);
    });
  }

  checkGroupURL(url) {
    fetch(`https://steamcommunity.com/groups/${url}`).then(async r => {
      let text = await r.text();

      if(text.indexOf("No group could be retrieved for the given URL.") !== -1) {
        console.log(`🦕 - url: ${url} | status = available | type = ${this.type.toUpperCase()}`);
        Deno.writeTextFileSync("./out/output-steamgroup.txt", `${url}\n`, {append: true});
      } else {
        console.log(`🦕 - url: ${url} | status = taken | type = ${this.type.toUpperCase()}`);
      }
    }).catch(e => {
      this.checkGroupURL(url);
    });
  }

  checkFortniteUsername(username) {
    fetch(`https://www.epicgames.com/id/api/account/name/state/${username}`).then(async r => {
      let json = await r.json();

      if(!json.exist) {
        console.log(`🦕 - username: ${username} | status = available | type = ${this.type.toUpperCase()}`);
        Deno.writeTextFileSync("./out/output-fortnite.txt", `${username}\n`, {append: true});
      } else {
        console.log(`🦕 - username: ${username} | status = taken | type = ${this.type.toUpperCase()}`);
      }
    });
  }
}