# SafePay - Online Tax Payment System

Online Tax Payment System (OTPS) has three actors Sysadmin, Staff, and User. Sysadmin is responsible for introducing users to the system. Staff is responsible for entering/updating users’ tax records, calculating taxes, and sending users invoices for payment. The user receives invoices and pays. Users’ records are stored encrypted by DES. DES secret key is created/updated periodically by Staff. The server has a public/private RSA key pair. RSA digital signature is used when sending DES-encrypted invoices. RSA key pair is created/updated by Staff. The hash function (48 bits) used for the digital signature is obtained by XOR of plaintext blocks. Payments while travelling DES-encrypted are protected from tampering with by message authentication code (MAC).

## Run Locally

Clone the project

```bash
  git clone https://github.com/mustafamengutay/safepay.git
```

Go to the project directory

```bash
  cd safepay-main
```

Install dependencies

```bash
  npm i
```

```bash
  npm run i-server
```

Start the server

```bash
  npm run dev
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`MONGO_URI`

## API Reference

### General

#### Login

```http
  POST /login
```

| Body       | Type     | Description  |
| :--------- | :------- | :----------- |
| `email`    | `string` | **Required** |
| `password` | `string` | **Required** |

### User

#### Get taxes

```http
  GET /v1/user/taxes
```

#### Send the gross salary to the system

```http
  PATCH /v1/user/gross-salary
```

| Body          | Type     | Description  |
| :------------ | :------- | :----------- |
| `grossSalary` | `number` | **Required** |

#### Pay taxes

```http
  POST /v1/user/tax-payment
```

| Body          | Type     | Description  |
| :------------ | :------- | :----------- |
| `grossSalary` | `number` | **Required** |

### Staff

#### Calculate taxes

```http
  POST /v1/staff/tax-calculation
```

| Body     | Type     | Description  |
| :------- | :------- | :----------- |
| `userId` | `string` | **Required** |

<!-- #### Update user's taxes

```http
  PATCH /staff/update-taxes
```

| Body                  | Type     | Description  |
| :-------------------- | :------- | :----------- |
| `userId`              | `string` | **Required** |
| `monthlyTax`          | `number` | **Required** |
| `socialInsurance`     | `number` | **Required** |
| `generalHealthSystem` | `number` | **Required** | -->

### Admin

#### Create a User

```http
  POST /v1/admin/user
```

| Body       | Type     | Description  |
| :--------- | :------- | :----------- |
| `name`     | `string` | **Required** |
| `surname`  | `string` | **Required** |
| `email`    | `string` | **Required** |
| `password` | `string` | **Required** |

#### Create a Staff

```http
  POST /v1/admin/staff
```

| Body       | Type     | Description  |
| :--------- | :------- | :----------- |
| `email`    | `string` | **Required** |
| `password` | `string` | **Required** |

#### Create an Admin

```http
  POST /v1/admin/admin
```

| Body       | Type     | Description  |
| :--------- | :------- | :----------- |
| `email`    | `string` | **Required** |
| `password` | `string` | **Required** |

## Tech Stack

**Client:** Loading...

**Server:** TypeScript, Node, Express, MongoDB

## TODO

- <input type="checkbox" disabled /> Add caching layer
- <input type="checkbox" disabled /> Implement security-based algorithms (DES, RSA, etc.).
