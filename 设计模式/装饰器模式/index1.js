import * as babel from "@babel/core";
import presetEnv from '@babel/preset-env'; // 确保这是默认导入
import react from '@babel/preset-react';   // 确保这是默认导入
import fs from 'node:fs';

// 1. 使用同步读取
const code = fs.readFileSync('./index.jsx', 'utf-8');

// 2. 关键修改 - 使用同步API transformSync
let result = babel.transformSync(code, {
    presets: [
        [presetEnv, { 
            useBuiltIns: 'usage', 
            corejs: 3 
        }],
        react
    ],
    // 3. 移除重复的JSX插件 - preset-react已包含此功能
    // plugins: ["@babel/plugin-transform-react-jsx"] 
});

console.log(result.code); // 输出转换后的代码