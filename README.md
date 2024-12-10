# Frontend

- Phân hệ dành cho quản trị viên và đối tác

---

# Coding convention

- Tên hàm & biến: `camelCase`
- Tên component & page: `PascalCase`
- Tên thư mục và các file khác: `camelCase`

---

# Thông tin project

## Tổ chức thư mục:

- Tổ chức project - Dựa trên (không giống hệt) bài viết: [How to Structure and Organize a React Application](https://www.taniarascia.com/react-architecture-directory-structure/#views)

```
- src
  - assets
    - images
  - components
    - TextField.tsx
    - Select.tsx
    - index.tsx
  - constants
    - ticket.ts
    - index.ts
  - routes
    - LoginRoute.tsx
    - AdminRoute.tsx
    - PartnerRoute.tsx
    - index.tsx
  - services
    - api
    - index.ts
  - store
    - authentication
    - user
    - index.ts
  - types
    - apiResponse.ts
    - index.ts
  - utils
    - validation.ts
    - currency.ts
    - index.ts
  - pages
    - Login.tsx
    - Dashboard.tsx
    - index.tsx
```

## Thông tin khác

- Package manager: yarn
- State manager: Redux
- Styles: Tailwind
- Convention: Eslint
