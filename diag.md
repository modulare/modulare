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
    draw_snip -- this first... --> B
    draw_snip -- ...and finally... --> C
    draw_snip --...then this...draw principal body, always via SNIP, of course  --> C1
    A --> A1
    C --draw replicate body on the edges--> C1
    C--if is set-->D
    A1-->B1
    