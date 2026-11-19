# Orders Screen Design Hierarchy

This document maps the current Orders screen composition, layout, and UI responsibilities from the implementation.

## Screen structure

- RootLayout
  - PagesLayout — src/app/(pages)/layout.tsx
    - Sidebar
    - SidebarInset
      - Header
      - main
        - OrdersPage — src/app/(pages)/orders/page.tsx
          - OrdersView — src/views/orders/index.tsx
            - Page heading
              - H1: Orders
              - Description: Manage and track all restaurant orders
            - Orders Frame
              - FrameHeader
                - OrdersTableToolbar
                  - Search field
                  - Filter and view controls
                    - Status select
                    - Type select
                    - View menu and column toggles
              - FramePanel
                - OrdersTable
                  - Table header
                  - Order rows
                  - Status and type indicators
                  - Empty state
              - FrameFooter
                - OrdersPagination
                  - Rows-per-page select
                  - Page navigation
            - OrderDetailsSheet — right-side drawer when an order is selected
      - Toaster
      - Footer

The heading sits above and outside the orders frame. The toolbar, table, and pagination are three vertically ordered regions inside one frame. The details sheet is a sibling of the frame in the view tree and opens as an overlay when an order is selected.

## Layout regions

### Page heading

- A vertical stack with a small gap.
- The title is Orders, at text-2xl and grows to text-3xl from the sm breakpoint.
- A muted description sits directly below it.
- The page content is constrained and padded by the surrounding (pages) layout.

### Orders frame

The frame fills the available width and groups the table controls, results, and pagination into one surface.

| Region | Contents | Layout role |
| --- | --- | --- |
| Header | Search, status filter, type filter, View menu | Controls above the results |
| Panel | Orders table | Main data surface; horizontal overflow is enabled |
| Footer | Rows-per-page control and pagination | Results navigation below the table |

The frame uses the shared Frame, FrameHeader, FramePanel, and FrameFooter primitives in src/components/ui/frame.tsx. The table panel sets p-0 so the table reaches the panel edges.

### Orders table

The table presents these columns in order:

1. Order ID
2. Type
3. Status
4. For
5. Items
6. Total
7. Placed At
8. Actions

The first seven columns can be hidden from the View menu; Actions stays visible. Order IDs open the detail sheet. The Actions column has a view button and a menu with detail, print, status-change, and cancel actions. The table body shows one row per visible order or a centered “No orders found” message.

Type is represented by an icon and label. Status is represented by a colored badge. Totals and line-item prices use two decimal places.

### Order details sheet

The sheet opens from the right and has a scrollable body between its header and footer.

- **Header:** order number, current status badge, and location subtitle.
- **Metadata:** order type and placed time in a two-column grid.
- **Items:** item count, image thumbnail or utensil fallback icon, item name, line total, unit price and quantity, and optional modifiers.
- **Kitchen note:** an informational alert, shown only when notes exist.
- **Footer:** subtotal, tax, optional discount, total, and a full-width Mark as Ready button.
- The ready button is disabled for cancelled orders. For Ready or Served orders its label changes to “Order Ready”.

## Component and UI primitive map

| Component | Responsibility | Main UI pieces |
| --- | --- | --- |
| OrdersView | Owns screen state, filtering, pagination calculations, and order actions | Page heading, frame, detail sheet |
| OrdersTableToolbar | Exposes search, status/type filters, and visible-column controls | Input group, selects, dropdown menu, button |
| OrdersTable | Renders the current page of orders and row actions | Table, buttons, dropdown menus, badges |
| OrderTypeBadge | Shows fulfillment type with a matching icon | Utensils, shopping bag, or bike icon |
| OrderStatusBadge | Maps order status to a badge style | Shared Badge |
| OrdersPagination | Changes page size and current page | Select and pagination controls |
| OrderDetailsSheet | Presents selected-order information and the ready action | Sheet, separators, alert, image, button |

Shared primitives are under src/components/ui/. The screen uses Frame, table primitives, InputGroup, Label, Select, DropdownMenu, Button, Badge, Pagination, Sheet, Separator, and Alert. Icons come from lucide-react.

## Responsive behavior

- The main view stacks the heading and frame with a consistent vertical gap.
- The toolbar is stacked on narrow screens. From sm upward, search and filter/actions share a row; the search field becomes a fixed-width control.
- Filter and action controls can wrap when space is limited.
- The table can scroll horizontally to preserve its columns on narrow screens.
- Pagination stacks the page-size control and page links on narrow screens, then places them on one row from sm upward.
- The detail sheet uses a right-side layout with larger maximum widths at the sm and md breakpoints.

## Interaction and data flow

OrdersView initializes its local order list from mockOrders. Search checks the order number, destination, location subtitle, and item names. Status and fulfillment type filters are applied with search before pagination. Search/filter and page-size changes reset the current page; the selected page is clamped when the result count shrinks.

Column visibility is held in the view and passed to both the toolbar and table. An order selection is held as selectedOrder; viewing or printing sets that order and opens the detail sheet. The print action calls window.print() shortly after opening the sheet. Status actions update the local order list and selected order, then show a toast notification. “Mark as Ready” uses the same status update path.

## Source files

- Route and page metadata: [src/app/(pages)/orders/page.tsx](<../src/app/(pages)/orders/page.tsx>)
- Inherited page shell: [src/app/(pages)/layout.tsx](<../src/app/(pages)/layout.tsx>)
- Screen controller and composition: [src/views/orders/index.tsx](../src/views/orders/index.tsx)
- Toolbar: [src/views/orders/orders-table-toolbar.tsx](../src/views/orders/orders-table-toolbar.tsx)
- Table: [src/views/orders/orders-table.tsx](../src/views/orders/orders-table.tsx)
- Pagination: [src/views/orders/orders-pagination.tsx](../src/views/orders/orders-pagination.tsx)
- Detail sheet: [src/views/orders/order-details-sheet.tsx](../src/views/orders/order-details-sheet.tsx)
- Status and type indicators: [src/views/orders/order-status-badge.tsx](../src/views/orders/order-status-badge.tsx), [src/views/orders/order-type-badge.tsx](../src/views/orders/order-type-badge.tsx)
- Shared frame and table primitives: [src/components/ui/frame.tsx](../src/components/ui/frame.tsx), [src/components/ui/table.tsx](../src/components/ui/table.tsx)

## Layout review note

The table’s empty-state cell uses a fixed colSpan={8}, while the View menu can hide any of the seven data columns. The empty state therefore spans more columns than are visible when columns are hidden, which can affect its alignment with the remaining table.
