<center style="margin-bottom:20px">
    <img src="/public/logo.svg"/>
</center>

**mhouse** is an `enterprise level full-stack application` for managing restaurants. It includes a range of features for managing every aspect of the business, from workforce and employee schedules to tasks, menu, catering orders, and payment tracking.

The application has a real-time notification system to track every action, as well as an admin dashboard for tracking various aspects of the business and settings to manage the restaurant's functionalities and access. It also includes an RBAC system to give various levels of access and permission.

The front-end of the application was built with Next.js, react-hook-form, zustand (for state management), SWR for API calls, and tailwind CSS. The back-end was built with Node.js, Express.js, MongoDB, Socket.IO for real-time notifications, and redis-rate-limiter and S3 for uploading static files. The application was deployed in containerized mode (using Docker) behind an nginx reverse proxy for production.

Key Features:

- Comprehensive management of workforce, employee schedules, tasks, menu, catering orders, and payment tracking
- Real-time notification system and admin dashboard for tracking and managing various aspects of the business
- RBAC system for controlling access and permissions
- Containerized deployment behind an nginx reverse proxy for a stable and scalable production environment
- Front-end built with Next.js, react-hook-form, zustand, SWR, and tailwind CSS
- Back-end built with Node.js, Express.js, MongoDB, Socket.IO, redis-rate-limiter, and S3

### Here is a few screeenshots to guide it's functionality

#### Registeration page

Fill the details and sign up. Verify the OTP and now `you will signed in as owner (super-admin) of the restaurnet`.

![sign up page](/public/snapshots/sign-in.png)

#### Admin account / setting page

go to top navigation and click on `settings`

![account setting](/public/snapshots/admin-profile.png)

#### Access page

Owner can give different level of `modular access` and permission to an employee

![account setting](/public/snapshots/team/permissions_access.png)

#### Employee account / setting page

Every other employee account page

![account setting](/public/snapshots/profile.png)

#### Main navigation menu

Main navigation menu(side drawer)

![main navigation](/public/snapshots/side_nav.png)

#### Owner dashboard

Only accessible to restaurent's owner to track different details

![owner dashboard](/public/snapshots/dashboard/admin.png)

#### Employee dashboard

Employee dashbpard to track its `roster`, `assigned tasks` and `payroll`

![employee dashboard](/public/snapshots/dashboard/employee.png)

#### Branches

Only owner can manage `CRUD` to branches of the restaurent.

![manage branches](/public/snapshots/branch/home.png)

![add branch](/public/snapshots/branch/add.png)

#### Branch switch

Only owner can switch to specific branch

![switch branch](/public/snapshots/branch/switch_branch.png)

#### Payroll

Owner can define payroll group as per its requirement. A `payroll-group` will need to be assigned while adding new workforce.
![manage payroll](/public/snapshots/payroll/home.png)

![create new payroll](/public/snapshots/payroll/add.png)

#### Workforce

Owner or an employee who have permission to workforce can manage this resource

![manage workforce](/public/snapshots/workforce/home.png)

- _Add the basic details of the employee_
  ![basics detais](/public/snapshots/workforce/add1.png)

- _Add Job details_ e.g.
  `department and job-title can be created on the fly`

  - department
  - job-title
  - employement type
  - tenure duration

  ![job details](/public/snapshots/workforce/add2.png)

- _Add visa details and payroll group_
  payroll you have created in `setting -> payroll`
  ![visa details](/public/snapshots/workforce/add3.png)

- _Select working days and time of the employee_
  ![select working day and time](/public/snapshots/workforce/add4.png)

#### Employee detail page

![individual employee details](/public/snapshots/workforce/individual.png)

#### Schedule

You can add an employee to `roster` or `leave` if he is available to work.
_Can switch the filter to view `day` or `week` wise_

- _weekly view_
  ![weekly schedule](/public/snapshots/schedule/weekly.png)
- _daily view_
  ![daily schedule](/public/snapshots/schedule/daily.png)
    <center>

  - `roster modal`
    <img SRC="/public/snapshots/schedule/add_roster.png" width="400px" style="margin-top:10px"/>

  - `calender to choose date range`
    <img SRC="/public/snapshots/schedule/calender.png" width="400px" style="margin-top:10px"/>
    </center>

#### Task

To manage and track all kind of tasks

![manage tasks](/public/snapshots/task/home.png)

- _Add Task information_
  ![add task details](/public/snapshots/task/add_task1.png)

- _Choose department and repeate type_
  ![add task nature and department](/public/snapshots/task/add_task2.png)

- _Different repeate options available are_
<center>
<img src="/public/snapshots/task/task_repeat1.png" width="350px"/>
<img src="/public/snapshots/task/task_repeat2.png" width="500px"/>
<img src="/public/snapshots/task/task_repeat3.png" width="550px"/>
</center>

#### Inventory

- **supplier**
  To manage raw item(stocktake) from different supplier

  ![manage supplier](/public/snapshots/inventory/supplier_home.png)

  - _add new supplier_
    ![add supplier basic info](/public/snapshots/inventory/add_supplier.png)
    ![add supplier order methods](/public/snapshots/inventory/add_supplier2.png)

  - _place a order from any registered supplier_
    ![place an order](/public/snapshots/inventory/build_cart.png)

  - _order history from a specific supplier_
    ![order history](/public/snapshots/inventory/orders.png)

- **stocktake**

  - _all stocktake items_
    ![manage stocktakes](/public/snapshots/inventory/stocktake_home.png)

  - _add a stocktake item_
    ![add new stocktake item](/public/snapshots/inventory/addStocktake.png)

##### Finance

Manage finance options

![manage cash](/public/snapshots/finance/cash_home.png)
![add new cash](/public/snapshots/finance/add_cash.png)
![manage fund transfer](/public/snapshots/finance/fund_transfer_home.png)

add and manage fund tranfers
![transfer fund](/public/snapshots/finance/fund_transfer.png)

##### Menu

Design and manage menu items. Also track the sold count.

![manage menu](/public/snapshots/menu/menu_home.png)
![add menu item info](/public/snapshots/menu/add_menu.png)
![add menu item raw material](/public/snapshots/menu/add_menu2.png)

#### Caterting order

Add and manage catering orders for its customers
![manage catering orders](/public//snapshots/catering_order/orders_home.png)
![add new catering orders](/public//snapshots/catering_order/add_order1.png)
![manage catering orders](/public//snapshots/catering_order/add_order2.png)
![manage catering orders](/public//snapshots/catering_order/add_order2.png)

Track all catering-orders in detail view.
![view catering orders detail](/public//snapshots/catering_order/orders_details.png)
