export const textFieldStyle = (height?:number,width?:number) => {
    return {
        "& .MuiInputBase-root": {
            height: height? `${height}px` : "auto",
            backgroundColor: "#EAF2FB",
            borderRadius: "10px",
            width: width? `${width}px` : "auto",
            border: "2px solid #ffffff",
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "transparent",
            },
            "&:hover": {
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "transparent",
              },
              borderColor: "#0056A2",
            },
            transition: "border 0.3s ease",
          },
          "& input": {
            textAlign: "center",
            fontFamily: "Poppins, sans-serif",
            color: "#0056A2",
            fontWeight: "medium",
          },
    }
}