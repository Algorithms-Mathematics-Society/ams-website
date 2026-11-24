import type { Solver } from "@/lib/solvers";
import styles from "./SolverTable.module.css";

interface Props {
  caption: string;
  solvers: Solver[];
  columns: { name: string; institution: string; year: string };
}

/** A plain semantic table: no ranks, times, medals or ordering by speed. */
export function SolverTable({ caption, solvers, columns }: Props) {
  return (
    <div className={styles.tableWrap}>
      <table className={styles.table}>
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr>
            <th scope="col">{columns.name}</th>
            <th scope="col">{columns.institution}</th>
            <th scope="col">{columns.year}</th>
          </tr>
        </thead>
        <tbody>
          {solvers.map((solver) => (
            <tr key={`${solver.name}-${solver.institution}-${solver.year}`}>
              <td>{solver.name}</td>
              <td>{solver.institution}</td>
              <td>{solver.year}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
