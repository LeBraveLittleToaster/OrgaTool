# ChecklistAPI


> # Create
> ***RESSOURCE:*** /checklist/create</br>
> ***Methode:*** POST </br>
> ***Description*** create a new checklist </br>
> Body 
> ```javascript
> {
>    "name" : "Some Checklist name",
>    "crDate" : date UTC,
>    "doneDate" : date UTC,
>    "description" : "Some description",
>    "entries" : [
>        {
>            "description" : "desc1",
>        },
>        {
>            "description" : "desc2",
>        }
>    ]
>}
> ```

> # Update
> ***RESSOURCE:*** /checklist/update/--checklistID--</br>
> ***Methode:*** POST </br>
> ***Description*** updates a checklist </br>
> Body 
> ```javascript
> {
>    "name" : "Some Checklist name",
>    "crDate" : date UTC,
>    "doneDate" : date UTC,
>    "description" : "Some description",
>    "entries" : [
>        {
>            "description" : "desc1",
>        },
>        {
>            "description" : "desc2",
>        }
>    ]
>}
> ```