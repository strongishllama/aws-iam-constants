# IAM Constants

![GitHub tag (latest SemVer pre-release)](https://img.shields.io/github/v/tag/strongishllama/iam-constants?include_prereleases)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://raw.githubusercontent.com/strongishllama/iam-constants/main/LICENSE)
![GitHub Workflow Status](https://img.shields.io/github/workflow/status/strongishllama/iam-constants/Release)

## Introduction
* Contains a generated enum list of all IAM actions.
* Start building IAM policy statements without having to check for typos in your actions.
* See a full list of available actions for a service.

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
