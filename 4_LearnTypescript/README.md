# @Types

## ABOUT

What do you do if the library you install is written in javascript?

## Solution 1

check for an *@types/<packagename>*

`$ npm install @types/lodash`

## Solution 2

Global variables need typescript keyword **declare**

```typescript
declare <variable name>: type
declare exampleVariable: string;
```