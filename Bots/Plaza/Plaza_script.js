const { Builder, By, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const chromedriver = require("chromedriver");

async function acceptCookies(driver) {
    try {
        const button = await driver.findElement(
            By.id("CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll")
        );
        await button.click();
        return driver;
    } catch (error) {
        console.log("error acceptCookies Plaza: ", error);
    }
    return driver;
}

async function configChoices(driver, city) {
    try {
        const dropdown = await driver.findElement(
            By.className(
                "filter locatie-filter template-type-filter tooltipstered"
            )
        );
        await dropdown.click();
        const options = await driver.findElements(
            By.className("locatie-preset ng-scope")
        );
        for (let i = 0; i < options.length; i++) {
            const span = await options[i].findElement(By.css("span"));
            if ((await span.getText()) == city) {
                console.log("found it: " + (await span.getText()));
                await options[i].click();
                await new Promise((resolve) => setTimeout(resolve, 2000));
                return driver;
            }
        }
    } catch (error) {
        console.log("error configChoices Plaza: ", error);
    }
    return driver;
}

async function getListings(driver) {
    let ids = [];
    let hrefs = [];
    try {
        const divs = await driver.findElements(
            By.className("list-item-content")
        );
        console.log("number of listings: " + divs.length);

        for (let i = 0; i < divs.length; i++) {
            console.log("line 53 so far so good " + i);
            const div = await divs[i].findElement(
                By.xpath(".//div/ng-include/div")
            );
            console.log("line 57 also good");
            const a = await div.findElement(By.css("a"));
            console.log("line 59: ");

            ids.push(await div.getAttribute("id"));
            hrefs.push(await a.getAttribute("href"));
            console.log(
                "line 63: " +
                    hrefs[hrefs.length - 1] +
                    " " +
                    ids[ids.length - 1]
            );
        }
        console.log("line 63 it is done");
    } catch (error) {
        console.log("error getListings Plaza: ", error);
    }
    console.log("line 75");
    console.log(hrefs);

    return [ids, hrefs];
}
async function findingDory(city, newIds, hrefs) {
    const fs = require("fs").promises;
    const filePath = "./Bots/Plaza/Plaza_" + city + "_ids.txt";
    try{
        await fs.access(filePath, fs.constants.F_OK);
        console.log("File already exists.");
    }
    catch(err){
        // File does not exist, create it
        await fs.writeFile(filePath, "", (err, fd) => {
            if (err) {
                console.error("Error creating file:", err);
            } else {
                fs.close(fd, (err) => {
                    if (err) {
                        console.error("Error closing file:", err);
                    } else {
                        console.log("File created successfully!");
                    }
                });
            }
        });
    }
    let ids = [];
    try{
        const data = await fs.readFile(filePath, "utf8");
        console.log(`File ${filePath} content:`, data);
        ids = data.split(/\s+/);
    }
    catch(err){
        console.error("Error reading file:", err);
    }

    console.log("read from file: " + ids + "\n");
    console.log("read from browser: " + newIds + "\n");

    let newListings = [];
    let data = "";
    for (let i = 0; i < newIds.length; i++){
        if (!ids.includes(newIds[i])) {
            newListings.push({ id: newIds[i], href: hrefs[i] });
        }
        data += newIds[i] + " ";
    }

    await fs.writeFile(filePath, data, "utf8", (err) => {
        if (err) {
            console.error("Error writing file:", err);
        } else {
            console.log("File written successfully!");
        }
    });
    return newListings;
}

async function findingNemoP(city) {
    const url =
        "https://plaza.newnewnew.space/aanbod/wonen#?gesorteerd-op=prijs%2B";
    let driver;

    try {
        // Set up Chrome options
        const options = new chrome.Options();

        options.addArguments("--disable-extensions");

        // Build the WebDriver instance with ChromeDriver
        driver = await new Builder()
            .forBrowser("chrome")
            .setChromeOptions(options)
            .build();

        // Navigate to the URL
        await driver.get(url);
        // Introduce a short delay
        await new Promise((resolve) => setTimeout(resolve, 500));

        driver = await acceptCookies(driver);
        driver = await configChoices(driver, city);

        const [newIds, hrefs] = await getListings(driver);
        console.log(newIds);
        for (let i = 0; i < newIds.length; i++) {
            console.log(newIds[i]);
            console.log(hrefs[i]);
        }

        return findingDory(city, newIds, hrefs);
    } catch (error) {
        console.error("Error findingNemoP Plaza:", error);
    } finally {
        if (driver) {
            await driver.quit();
        }
    }
}
module.exports = {findingNemoP};

(async function testP() {
    let result = await findingNemoP("Nederland - Limburg");
    console.log("result length: " + result.length);
})();