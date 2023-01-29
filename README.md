# Google Icon Names
There are scripts that parse [file from Google's material-design-icons repository](https://raw.githubusercontent.com/google/material-design-icons/master/font/MaterialIcons-Regular.codepoints) and create TypeScript constants for convinient usage icon names in your projects.
## Installation

**npm:**
```bash
npm i google-icon-names
```
## Usage
```typescript
import { msAccountCircle } from 'google-icon-names';

console.log(msAccountCircle); // account_circle
```