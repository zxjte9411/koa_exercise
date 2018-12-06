const Koa = require('koa')
const logger = require('koa-logger');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const views = require('koa-views');
const static = require('koa-static')

const path = require('path');

const app = new Koa();
const router = Router();
