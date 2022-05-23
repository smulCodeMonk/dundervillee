# Code Quality

## Prettier

We use prettier to format the code in one generic way, this way all code will look alike and will be easy to read.

1. If you're using vscode, install the prettier extention. [Download](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
2. Set prettier as default formatter [How to](https://github.com/microsoft/vscode/issues/108447#issuecomment-707236252)

## ESLint

We use linting to track bugs fast.

1. If you're using vscode, install eslint [Download](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
2. When enabled eslint will show all 'problems' inside vscode.

## CssComb

This tool will format all stylesheets and structure the selectors.

## VSCode settings

The boilerplate has a custom vscode config. It will exclude the out folder from your searches.

## Husky

We're using husky to validate staged files on code quality before being committed to the repository.

## Auto fix

It's possible to check linting or auto fix all files with `npm run lint-check` and `npm run lint-fix`.
