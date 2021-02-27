```mermaid
flowchart LR
    setup
    draw
    sequence
    draw_snip
    subgraph SNIP
      A[constructor]
      B[move]
      C[edges]
      D[displayRange]
    end
    subgraph BODY
      A1[constructor]
      B1[set_range]
      C1[display]
    end
    setup ----> A
    draw-->sequence 
    sequence-->draw_snip
    draw_snip --> B
    draw_snip --> C
    draw_snip --principal body --> C1
    A --> A1
    C --body on the edges--> C1
    C--if is set-->D
    A1-->B1
    