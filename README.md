# AWS IAM Constants

![NPN version](https://img.shields.io/npm/v/@strongishllama/aws-iam-constants)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://raw.githubusercontent.com/strongishllama/aws-iam-constants/main/LICENSE)
![GitHub Workflow Status](https://img.shields.io/github/workflow/status/strongishllama/aws-iam-constants/Release)

## Introduction
* Contains a generated enum list of all AWS IAM actions.
* Start building AWS IAM policy statements without having to check for typos in your actions.
* See a full list of available actions for a service.

## Installation
```
npm install @strongishllama/aws-iam-constants
```

## Example
```ts
new iam.PolicyStatement({
    actions: [
        DynamoDB.GET_ITEM,
        DynamoDB.PUT_ITEM,
        DynamoDB.QUERY
    ],
    resources: [
        `${table.tableArn}/index/*`,
        table.tableArn
    ]
})
```
