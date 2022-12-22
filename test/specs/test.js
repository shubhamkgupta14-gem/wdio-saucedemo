var assert = require('assert');

describe('SauceDemo - Automation', async () => {
    const userName = "standard_user"
    const password = "secret_sauce"
    const productName = "Sauce Labs Onesie"


    it('SauceDemo - launch url', async () => {
        await browser.url('/')
        await browser.setTimeout({ 'implicit': 20000 })
        await expect(browser).toHaveUrlContaining('saucedemo')
        await browser.maximizeWindow()
        await browser.pause(1000)
    });

    it('Login - login', async () => {
        await $('#user-name').setValue(userName)
        await $('#password').setValue(password)
        await $('#login-button').click()
        await browser.pause(1000)
    });

    it('Product - select product', async () => {
        const productsElement = await $$('div.inventory_item_name')

        for (const ele of productsElement) {
            if (await ele.getText() === productName) {
                await ele.click()
                break
            }
        }
        await browser.pause(1000)
    });

    it('Product Details - click add to cart', async () => {
        await $('#back-to-products').waitForClickable({ timeout: 3000 })
        const product = await $('.inventory_details_name').getText()
        assert.strictEqual(product, productName, "product name mismatch!")
        await $('button=Add to cart').click()
        await $('a.shopping_cart_link').click()
    });

    it('Cart - click checkout', async () => {
        await browser.pause(1000)
        const title = await $('.title').getText()
        assert.strictEqual(title, "YOUR CART")
        const product = await $('.inventory_item_name').getText()
        assert.strictEqual(product, productName)
        await $('#checkout').click()
    });

    it('Checkout - fill information', async () => {
        await browser.pause(1000)
        const title = await $('.title').getText()
        assert.strictEqual(title, "CHECKOUT: YOUR INFORMATION")
        await $('#first-name').setValue('First')
        await $('#last-name').setValue('Last')
        await $('#postal-code').setValue('234567')
        await $('#continue').click()
    });

    it('Checkout - overview', async () => {
        await browser.pause(1000)
        const title = await $('.title').getText()
        assert.strictEqual(title, "CHECKOUT: OVERVIEW")
        const product = await $('.inventory_item_name').getText()
        assert.strictEqual(product, productName)
        await $('#finish').click()
    });

    it('Checkout - complete', async () => {
        await browser.pause(1000)
        const title = await $('.title').getText()
        assert.strictEqual(title, "CHECKOUT: COMPLETE!")
        const message = await $('h2.complete-header').getText()
        assert.strictEqual(message, "THANK YOU FOR YOUR ORDER")
    });


});