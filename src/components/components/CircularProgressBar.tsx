import { PieChart } from "@mui/x-charts/PieChart";
import Box from "@mui/material/Box";
import { Typography, useTheme, useMediaQuery } from "@mui/material";

interface CircularProgressBarProps {
  percentage: number;
  size?: number;
}

const CircularProgressBar = ({ percentage }: CircularProgressBarProps) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  
  // Validate and clamp the percentage value to be between 0 and 100
  const value = Math.max(0, Math.min(100, percentage));
  const remainingValue = 100 - value;

  // Responsive sizing
  const chartSize = isSmallScreen ? {
    width: 200,
    height: 180,
    outerRadius: 80,
    innerRadius: 60,
    cx: 100,
    cy: 90,
    fontSize: 30,
    labelSize: 12
  } : {
    width: 300,
    height: 250,
    outerRadius: 125,
    innerRadius: 100,
    cx: 150,
    cy: 120,
    fontSize: 40,
    labelSize: 16
  };

  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        //flexDirection: "column",
        alignItems: "center",
        margin: 0,
        width: '100%',
        height: 'auto',
        justifyContent: 'center'
      }}
    >
      <PieChart
        series={[
          {
            data: [
              { id: 0, value, label: "Remaining", color: "#40E734" },
              { id: 1, value: remainingValue, label: "Used", color: "#EAEAEA" },
            ],
            innerRadius: chartSize.innerRadius,
            outerRadius: chartSize.outerRadius,
            paddingAngle: 0,
            cornerRadius: 0,
            startAngle: -0.5,
            endAngle: 360,
            cx: chartSize.cx,
            cy: chartSize.cy,
          },
        ]}
        width={chartSize.width}
        height={chartSize.height}
        slotProps={{
          legend: { hidden: true },
        }}
      />
      <Box
        sx={{
          position: "absolute",
          //display: "flex",
          //flexDirection: "column",
          //alignItems: "center",
          //justifyContent: "center",
          top: '50%',
          left: '50%',
          transform: "translate(-50%, -50%)",
          color: "#0056A2",
          textAlign: 'center',
          //width: '100%',
          pointerEvents: 'none'
        }}
      >
        <Typography 
          sx={{
            fontSize: chartSize.fontSize,
            fontWeight: 900,
            lineHeight: 1,
          }}
            variant="body2"
        >
          {`${value}%`}
        </Typography>
        <Typography 
          sx={{
            fontSize: chartSize.labelSize,
            fontWeight: 700,
            lineHeight: 1.2,
            display: 'block',
            mt: 0.5
          }}
            variant="body2"
        >
          REMAINING
        </Typography>
      </Box>
    </Box>
  );
};

export default CircularProgressBar;