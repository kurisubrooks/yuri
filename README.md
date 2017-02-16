# Yuri
Sort of like Midori but with 100% more selfbot features

### Installation
```bash
git clone https://github.com/kurisubrooks/yuri.git
cd yuri/
npm install
```

### Setup
Create a file called `keychain.js` in the main directory, with the following contents, filling in each line with the appropriate keys needed for each.

```js
module.exports = {
    "token": "" // Discord Bot Token
}
```

### Run
To start Yuri, you can start it with

```bash
npm start
```

If you wish to run Yuri under Production, you can start it with pm2 by using

```bash
pm2 start index.js --name "yuri" --node-args="--harmony" -- --color
```
