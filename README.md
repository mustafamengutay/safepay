# Online Tax Payment System

Online Tax Payment System (OTPS) having three actors as Sysadmin, Staff, User. Sysadmin is responsible for introducing users to the system. Staff is responsible for entering/updating users’ tax records, calculating taxes, and sending users invoices for payment. User receives invoices, and pays. Users’ records are stored encrypted by DES. DES secret key is created/updated periodically by Staff. Server has public/private RSA key pair. RSA digital signature is used when sending DES-encrypted invoices. RSA key pair is created/updated by Staff. Hash function (48 bits) used for the digital signature is obtained by XOR of plaintext blocks. Payments while travelling DES-encrypted are protected from tampering with by message authentication code (MAC).

## Run Locally

Clone the project

```bash
  git clone https://github.com/mustafamengutay/tax-payment-system.git
```

Go to the project directory

```bash
  cd tax-payment-system
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
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
  GET /user/taxes
```

#### Send the gross salary to the system

```http
  PATCH /user/gross-salary
```

| Body          | Type     | Description  |
| :------------ | :------- | :----------- |
| `grossSalary` | `number` | **Required** |

#### Pay taxes

```http
  POST /user/pay-taxes
```

| Body          | Type     | Description  |
| :------------ | :------- | :----------- |
| `grossSalary` | `number` | **Required** |

### Staff

#### Calculate taxes

```http
  POST /staff/calculate-taxes
```

| Body     | Type     | Description  |
| :------- | :------- | :----------- |
| `userId` | `string` | **Required** |

#### Update user's taxes

```http
  PATCH /staff/update-taxes
```

| Body                  | Type     | Description  |
| :-------------------- | :------- | :----------- |
| `userId`              | `string` | **Required** |
| `monthlyTax`          | `number` | **Required** |
| `socialInsurance`     | `number` | **Required** |
| `generalHealthSystem` | `number` | **Required** |

### Admin

#### Create a User

```http
  POST /admin/create-user
```

| Body       | Type     | Description  |
| :--------- | :------- | :----------- |
| `name`     | `string` | **Required** |
| `surname`  | `string` | **Required** |
| `email`    | `string` | **Required** |
| `password` | `string` | **Required** |

#### Create a Staff

```http
  POST /admin/create-staff
```

| Body       | Type     | Description  |
| :--------- | :------- | :----------- |
| `email`    | `string` | **Required** |
| `password` | `string` | **Required** |

#### Create an Admin

```http
  POST /admin/create-admin
```

| Body       | Type     | Description  |
| :--------- | :------- | :----------- |
| `email`    | `string` | **Required** |
| `password` | `string` | **Required** |

## Tech Stack

**Client:** Loading...

**Server:** Node, Express, MongoDB

## Authors

- [@Kedu88](https://github.com/Kedu88)
- [@seyitahmetinci](https://github.com/seyitahmetinci)
- [@mustafamengutay](https://www.github.com/octokatherine)
