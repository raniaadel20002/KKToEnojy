## Integrate ReviewsProject Dashboard with Backend

The ReviewsProject dashboard page needs to be implemented and connected to the backend.

### 1. Naming & Separation

- The feature must be named **ReviewsProject** everywhere: folders, files, components, types, hooks, API services, and exports.
- It must remain completely separate from the existing `Reviews` feature.
- Do not modify, reuse, rename, or break any existing `Reviews` functionality.

### 2. Dashboard Placement & Design

- Add **ReviewsProject** to the Admin Dashboard navigation immediately after **FAQ**.
- Place its dashboard page directly after FAQ in the dashboard navigation order.
- Follow the existing standard dashboard design and styling used by other admin pages.
- Reuse the existing dashboard layout, page structure, tables, spacing, typography, buttons, and components wherever applicable.
- Do not use the Home page ReviewsProject design for the dashboard.
- Do not introduce a new design system or unrelated custom styling.

### 3. Backend API

Use only these documented endpoints:

**GET – Get All ReviewsProject**

`GET /api/ReviewsProject`

Query parameters:
- `pageNumber` (integer)
- `pageSize` (integer)

Response:
```json
{
  "success": true,
  "message": "string",
  "data": [
    {
      "id": 0,
      "comment": "string",
      "firstName": "string",
      "lastName": "string",
      "email": "string",
      "phone": "string",
      "rate": 0,
      "createdAt": "2026-11-03T14:12:13.324Z"
    }
  ]
}
```

**POST – Create ReviewsProject**

`POST /api/ReviewsProject`

Request body:
```json
{
  "firstName": "string",
  "lastName": "string",
  "email": "string",
  "phone": "string",
  "comment": "string",
  "rate": 0
}
```

**GET – Get ReviewsProject By ID**

`GET /api/ReviewsProject/{id}`

Path parameter:
- `id` (integer)

Response data contains:
`id`, `comment`, `firstName`, `lastName`, `email`, `phone`, `rate`, `createdAt`.

**DELETE – Delete ReviewsProject**

`DELETE /api/ReviewsProject/{id}`

Path parameter:
- `id` (integer)

Response:
```json
{
  "success": true,
  "message": "string",
  "data": "string"
}
```

### 4. Implementation Requirements

First, inspect the existing backend integration structure and identify how other dashboard features organize:

- API services
- Types and interfaces
- React hooks
- Data fetching
- Pagination
- Error handling
- Authentication and authorization

Then follow the exact existing project conventions and architecture. Do not introduce a new pattern.

Implement the ReviewsProject integration for the dashboard:

- Fetch and display reviews using GET.
- Connect pagination using `pageNumber` and `pageSize`.
- Fetch a single review's details using GET by ID wherever the existing UI requires it.
- Connect the delete action using DELETE.
- Connect POST only wherever the existing ReviewsProject UI requires creating a review.

Use only the exact fields and response structures documented above.

### 5. Strict Rules

- Do not change unrelated dashboard pages or existing designs.
- Do not invent endpoints, request fields, response fields, or backend functionality.
- Do not use dummy data or hardcoded fallback data.
- Do not assume pagination response metadata that is not documented. Inspect the actual project/API conventions and use only supported information.
- Do not modify the existing Reviews API or its integration.
- Do not guess the API base URL, authentication requirements, or response structure. Verify them from the existing project setup.
- Keep all ReviewsProject API services, types, hooks, and components separate from the old Reviews feature.

### 6. Final Verification

- Verify all ReviewsProject API requests and their payloads.
- Verify pagination, details, and deletion.
- Run the relevant checks/build if available.
- Report exactly which files were created or modified and any backend limitations.

**Start by inspecting the existing dashboard and backend integration structure. Then implement ReviewsProject, add it immediately after FAQ in the dashboard navigation, and connect it to the documented API without changing unrelated code.**