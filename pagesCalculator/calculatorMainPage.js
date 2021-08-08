exports.calculatorMainPage = class calculatorMainPage {
    constructor(page) {
        this.page = page;
    }
    async goto() {
        await this.page.goto('https://testsheepnz.github.io/BasicCalculator');
    };

    async selectBuild(buildVersion) {
        await this.page.selectOption('#selectBuild', buildVersion);
    };

    async clickCalculateButton() {
        await this.page.click('#calculateButton');
    }

    async insertNumber1(inputNumber1) {
        await this.page.fill('#number1Field', inputNumber1);
    }

    async insertNumber2(inputNumber2) {
        await this.page.fill('#number2Field', inputNumber2);
    }

    async selectOperation(operation) {
        await this.page.selectOption('#selectOperationDropdown', operation);
    }

    async gettextMessage() {  
        return await this.page.inputValue('#numberAnswerField');
    }

    async getErrorMessage() {
        return await this.page.textContent('#errorMsgField');
    }
}






