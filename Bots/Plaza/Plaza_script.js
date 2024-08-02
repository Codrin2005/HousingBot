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
            if (span.getText() === city) {
                await options[i].click();
                return driver;
            }
        }
    } catch (error) {
        console.log("error configChoices Plaza: ", error);
    }
}

async function getListings(driver) {
    let ids = [];
    let hrefs = [];
    try {
        const divs = await driver.findElements(
            By.className("list-item-content")
        );
        console.log("Number of sections found:", sections.length);

        for (let i = 0; i < divs.length; i++) {
            const div = await divs[i].findElement(
                By.xpath(".//div/ng-include/div")
            );
            const a = await div.findElement(By.css("a"));

            ids.push(await div.getAttribute("id"));
            hrefs.push(await a.getAttribute("href"));
        }
    } catch (error) {
        console.log("error getListings Plaza", error);
    }

    return { ids, hrefs };
}
async function findingDory(city, newIds, hrefs) {
    const fs = require("fs");
    const filePath = "./Bots/Plaza/Plaza_" + city + "_ids.txt";
    await fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            // File does not exist, create it
            fs.open(filePath, "w", (err, fd) => {
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
        } else {
            console.log("File already exists.");
        }
    });

    let ids = [];
    await fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
            console.error("Error reading file:", err);
        } else {
            console.log(`File ${filePath} content:`, data);
            ids = data.split("/s+/");
        }
    });

    let newListings = [];
    let data = "";
    for (let i = 0; i < newIds.length; i++) {
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

    if (newListings.length > 0) {
        let body =
            newListings.length + " new listings found on RoomPlaza in " + city;
        sendMails(body);
    }

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
        await new Promise((resolve) => setTimeout(resolve, 1000));

        driver = await acceptCookies(driver);
        driver = await configChoices(driver, city);

        const { newIds, hrefs } = await getListings(driver);

        for (let i = 0; i < newIds.length; i++) {
            console.log(newIds[i]);
            console.log(hrefs[i]);
        }

        return findingDory(city, newIds, hrefs);
    } catch (error) {
        console.error("An error occurred:", error);
    } finally {
        if (driver) {
            await driver.quit();
        }
    }
}

(async function testP() {
    let result = await findingNemoP("Nederland - Zuid-Holland");
    console.log(result);
})();
