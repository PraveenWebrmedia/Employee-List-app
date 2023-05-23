const KEYS ={
    employees:'employees',
    employeeId:'employeeId'
}

export const getDepartmentCollection = () => ([
    { id: '1', title: 'Human Resource' },
    { id: '2', title: 'Technology' },
    { id: '3', title: 'sales' },
    { id: '4', title: 'Management' }
])

export const getDesignationCollection = () => ([
    { id: '1', title: 'Manager' },
    { id: '2', title: 'Associate Manager' },
    { id: '3', title: 'Lead' },
    { id: '4', title: 'Project Manager' },
    { id: '5', title: 'Senior Developer' },
    { id: '6', title: 'Developer' },
    { id: '7', title: 'Sales Manager' }
])

export function insertEmployee(data){
  let employees = getAllEmployees();
  data['id'] = generateEmployeeId()
  employees.push(data)
  localStorage.setItem(KEYS.employees,JSON.stringify(employees))
}

export function UpdateEmployee(data){
  let employees = getAllEmployees()
  let recordIndex = employees.findIndex(x => x.id == data.id)
  employees[recordIndex] = { ...data }
  localStorage.setItem(KEYS.employees, JSON.stringify(employees))
}

export function deleteEmployee(empId){
  let employees = getAllEmployees()
  employees = employees.filter(x => x.id != empId)
  localStorage.setItem(KEYS.employees, JSON.stringify(employees))
}

export function generateEmployeeId() {
    if (localStorage.getItem(KEYS.employeeId) == null){
      localStorage.setItem(KEYS.employeeId, '0')
    }
    var id = parseInt(localStorage.getItem(KEYS.employeeId))
    localStorage.setItem(KEYS.employeeId, (++id).toString())
    return id;
}

export function getAllEmployees() {
    if (localStorage.getItem(KEYS.employees) == null){
      localStorage.setItem(KEYS.employees, JSON.stringify([]))
    }
    let employees = JSON.parse(localStorage.getItem(KEYS.employees));
    let departments = getDepartmentCollection()
    let designations = getDesignationCollection()
    return employees.map(x => ({
      ...x,
      department : departments[x.departmentId - 1].title,
      Designation : designations[x.designation - 1].title,
    }))
}