import plotly.graph_objects as go
import sys

x = eval(sys.argv[2])
y = eval(sys.argv[1])

fig = go.Figure(
    data=go.Scatter(
        x=x,
        y=y,
        mode="lines+markers",
        line=dict(width=3)
    )
)

fig.update_layout(
    title="Dice Average Graph",
    xaxis_title="Dice Rolls",
    yaxis_title="Averages",
    template="plotly_dark"
)

fig.write_image("chart.png", width=900, height=600)
