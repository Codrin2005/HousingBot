const { Builder, By, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const chromedriver = require("chromedriver");

async function findingDory(city, newIds, hrefs) {
    const fs = require("fs");
    const filePath = "./Bots/RoomPlaza/RoomPlaza_" + city + "_ids.txt";
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
            ids = data.split("/s+/").map(Number);
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

    return newListings;
}

async function findingNemoRP(city) {
    const url = "https://www.roomplaza.com/";
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
        await new Promise((resolve) => setTimeout(resolve, 3000));

        let cookieButton = await driver.findElements(
            By.className("accept-button")
        );
        if (cookieButton.length > 0) {
            let cookieButton2 = await cookieButton[0].findElements(
                By.css("button")
            );
            if (cookieButton2.length > 0) {
                await cookieButton2[0].click();
            }
        }

        let dropdown = driver.findElement(By.className("dropdown"));
        dropdown.click();
        let cityOptions = await dropdown.findElement(By.css("ul"));
        let cityOption = await cityOptions.findElement(
            By.xpath(`//*[text()='${city}']`)
        );
        cityOption.click();

        let searchButton = await driver.findElement(By.id("submit"));
        await searchButton.click();

        let newIds = [];
        let hrefs = [];

        let buttonInd = 1;
        //await new Promise((resolve) => setTimeout(resolve, 300000));

        let buttons = await driver.findElement(By.className("pagination"));
        let nextButton = await buttons.findElements(
            By.xpath(`//*[text()='${buttonInd}']`)
        );

        while (nextButton.length > 0) {
            await new Promise((resolve) => setTimeout(resolve, 1500));
            await nextButton[0].click();
            let apartments = await driver.findElements(
                By.className("apartment")
            );

            for (let i = 0; i < apartments.length; i++) {
                newIds.push(
                    await apartments[i].getAttribute("data-apartment-id")
                );
                hrefs.push(await apartments[i].getAttribute("href"));
            }

            buttonInd++;
            buttons = await driver.findElement(By.className("pagination"));
            nextButton = await buttons.findElements(
                By.xpath(`//*[text()='${buttonInd}']`)
            );
        }

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

(async function test() {
    let result = await findingNemoRP("Amsterdam");
    console.log(result);
})();
