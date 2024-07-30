const fs = require('fs')
const path = require('path')
const faker = require('@faker-js/faker').faker


const generateAccount = () => {
    let account = {}

    

    return account
}

const generateAccounts = () => {
    const accounts = []

    for(let i = 0; i < 100; i++) {
        accounts.push(generateAccount())
    }

    return accounts
}

const generateAccountsFile = (filePath) => {
    const accounts = generateAccounts()
    const filedata = JSON.stringify(accounts, null, 2)
    fs.writeFile(
        filePath,
        filedata,
        (error) => {
            if (error) {
                console.error(error)
            }
            console.log('Accounts generated: ${filePath}')
        }
    )
}

generateAccountsFile(path.join(__dirname, '../app/data/accounts.json'))