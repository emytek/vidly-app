import React from 'react'
import TableBody from './TableBody'
import TableHeader from './TableHeader'

const Table = ({columns, onSort, sortColumn, data}) => {
  return (
            <table className="table">
                <TableHeader 
                    columns= {columns} 
                    sortColumn={sortColumn} 
                    onSort={onSort} 
                />
                <TableBody columns={columns} data={data} />
                {/* <tbody>
                    {movies.map(movie => 
                        <tr key={movie._id}>
                        <td>{movie.title}</td>
                        <td>{movie.genre.name}</td>
                        <td>{movie.numberInStock}</td>
                        <td>{movie.dailyRentalRate}</td>
                        <td>
                            <Like liked={movie.liked} onClick={() => onLike(movie)} />
                        </td>
                        <td><button onClick={()=> onDelete(movie)} className="btn btn-danger btn-sm">Delete</button></td>
                    </tr>
                    )}
                </tbody> */}
            </table> 
  )
}

export default Table