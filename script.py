import plotly.graph_objects as go
import sys
from datetime import datetime

fileNameTime = datetime.now().strftime("%m%d%Y-%I%M%S")
titleTime = datetime.now().strftime("%I:%M %p %d %B %Y")
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
    title=f"Dice Average Graph<br><sup>{titleTime}</sup>",
    xaxis_title="Dice Rolls",
    yaxis_title="Averages",
    template="plotly_dark"
)

fig.write_image(f"./charts/{fileNameTime}-chart.png", width=900, height=600)

print(f"{fileNameTime}-chart.png")