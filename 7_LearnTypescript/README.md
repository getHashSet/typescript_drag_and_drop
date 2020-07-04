# Node Server

## _with Type support (or as I like to call it C#-lite ft Javascript)_

## Start

```cli
$ npm install express nodemon body-parser
$ npm install --save-dev @types/express @types/node
```

## TS files

TS config can target ES2018 and ES2020 as long as they are supported by the host server
syntax change for TS severs.

`import express from "express";`

This syntax replaces the following code.

`const express = require('express');`
