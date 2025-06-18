# Vehicle Parts Inventory System

![Screenshot 2025-06-18 113839](https://github.com/user-attachments/assets/e5f50538-f4df-466e-8338-6ad16bf148a4)
![Screenshot 2025-06-18 113905](https://github.com/user-attachments/assets/c707c016-75eb-474a-b3dc-ff6c45f9158a)
![Screenshot 2025-06-18 113925](https://github.com/user-attachments/assets/b4b8479a-f50c-4db2-9100-75f6adfa22a4)
![Screenshot 2025-06-18 113949](https://github.com/user-attachments/assets/0c39b653-1dde-40e8-9628-45834641fa75)
![Screenshot 2025-06-18 114014](https://github.com/user-attachments/assets/19e963bf-ee5b-4986-bf4b-4f1306b3d477)
![Screenshot 2025-06-18 114041](https://github.com/user-attachments/assets/b0ebe073-b2ca-43fd-861c-f9b96c6d87ff)
![Screenshot 2025-06-18 114104](https://github.com/user-attachments/assets/1f3056bf-b8a1-4ae1-8c57-b132413aa7e0)
![Screenshot 2025-06-18 114120](https://github.com/user-attachments/assets/66eb662d-a747-4b9b-b5f7-5b8efc7007a5)
![Screenshot 2025-06-18 114144](https://github.com/user-attachments/assets/b04e8b71-5484-4c73-b65f-9cadcd5a3106)

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
