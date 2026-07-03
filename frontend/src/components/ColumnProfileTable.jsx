import {

Card,

CardContent,

Typography,

Table,

TableHead,

TableBody,

TableRow,

TableCell

}

from "@mui/material";

export default function ColumnProfileTable({

report

}){

if(!report)

return null;

const profile=

report.statistics.column_profile;

return(

<Card sx={{mt:3}}>

<CardContent>

<Typography
variant="h5"
mb={2}
>

Column Profile

</Typography>

<Table>

<TableHead>

<TableRow>

<TableCell>

Column

</TableCell>

<TableCell>

Type

</TableCell>

<TableCell>

Null %

</TableCell>

<TableCell>

Unique

</TableCell>

<TableCell>

Outliers

</TableCell>

</TableRow>

</TableHead>

<TableBody>

{

Object.entries(profile).map(

([name,data])=>(

<TableRow key={name}>

<TableCell>

{name}

</TableCell>

<TableCell>

{data.dtype}

</TableCell>

<TableCell>

{data.null_percentage}

</TableCell>

<TableCell>

{data.unique}

</TableCell>

<TableCell>

{data.outlier_count}

</TableCell>

</TableRow>

)

)

}

</TableBody>

</Table>

</CardContent>

</Card>

);

}