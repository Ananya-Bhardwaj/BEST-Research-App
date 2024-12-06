import React, { useState } from "react";
import { StyleSheet, View, Button, Alert, Text } from "react-native";
import axios from "axios";
import { ec as EC } from "elliptic";

export default function PolynomialPage({route}) {
    // const id = route.params.id;
  const ec = new EC("secp256k1");
  // const order = BigInt(ec.n.toString());
  const order = 19;
  const userId = "67503ece471065b9047a039f"; // Example user ID
  const userIdString = String(userId);
  const [sharesData, setSharesData] = useState(null); // To hold the fetched shares data
  const [paperText, setPaperText] = useState(null);

  const generatePolynomial = (t, constantTerm, order) => {
    const coefficients = [constantTerm];
    for (let i = 1; i < t; i++) {
      // coefficients.push(BigInt(Math.floor(Math.random() * Number(order))));
      coefficients.push(Math.floor(Math.random() * Number(order)));
    }
    return coefficients;
  };

  // const evaluatePolynomial = (coefficients, x, order) => {
  //   return coefficients.reduce((acc, coeff, index) => {
  //     return (acc + coeff * BigInt(x) ** BigInt(index)) % order;
  //   }, BigInt(0));
  // };
  const evaluatePolynomial = (coefficients, x, order) => {
    return coefficients.reduce((acc, coeff, index) => {
      return (acc + coeff * x ** (index)) % order;
    }, 0);
  };

  const generatePolynomialsAndShares = async () => {
    const t = 3; // Degree of polynomial + 1
    const n = 4; // Number of polynomials
    // const constantTerm = BigInt(Math.floor(Math.random() * Number(order)));
    const constantTerm = Math.floor(Math.random() * Number(order));
    const polynomial = generatePolynomial(t, constantTerm, order);
    const shares = Array.from({ length: n }, (_, x) =>
      evaluatePolynomial(polynomial, x + 1, order)
    );

    console.log("Polynomials:", polynomial);
    console.log("Shares:", shares);

    const sharesAsStrings = shares.map((share) => share.toString());
    const payload = { uid: userId, polyvalues: sharesAsStrings };

    try {
      const response = await axios.post("http://192.168.199.97:5000/api/userpoly", payload);
      console.log("Response from server:", response.data);
      Alert.alert("Success", "Polynomials and Shares sent to server successfully!");
    } catch (error) {
      console.error("Error while sending data:", error);
      Alert.alert("Error", "Failed to send data to server.");
    }
  };

  const getAllAdminsAndShares = () => {
    axios
      .get("http://192.168.199.97:5000/api/admins")
      .then((response) => {
        const adminUserIds = response.data;
        console.log("Admin User IDs:", adminUserIds);

        const sortedAdmins = adminUserIds.sort((a, b) => a._id.localeCompare(b._id));
        console.log("Sorted Admins:", sortedAdmins);

        const fixedIndex = sortedAdmins.findIndex((admin) => admin._id === userIdString);
        if (fixedIndex === -1) {
          console.error("Target user not found in admin list.");
          Alert.alert("Error", "Target user not found in admin list.");
          return;
        }

        console.log("Fixed Index for Target User:", fixedIndex);

        const promises = sortedAdmins.map((admin) => {
          const adminIdStr = String(admin._id);
          const url = `http://192.168.199.97:5000/api/user_poly_vals/${adminIdStr}`;

          return axios
            .get(url)
            .then((response) => {
              const polyvalues = response.data.polyvalues;
              console.log(`Polyvalues for User ${adminIdStr}:, polyvalues`);
              return polyvalues[fixedIndex]; // Value at fixed index
            })
            .catch((error) => {
              console.error(`Error fetching polyvalues for user ${adminIdStr}:`, error);
              return null; // Handle errors gracefully
            });
        });

        Promise.all(promises)
          .then((valuesAtFixedIndex) => {
            console.log("Values at Fixed Index from All Users:", valuesAtFixedIndex);

            const sumOfShares = valuesAtFixedIndex.reduce((acc, value) => {
              if (value !== null) {
                // return acc + BigInt(value);
                return acc + value;
              }
              return acc;
            }, 0);

            console.log("Sum of Shares:", sumOfShares.toString());
            saveToKeystore(sumOfShares.toString());
            setSharesData(sumOfShares.toString());
            Alert.alert("Success", "Shares successfully added and saved!");
          })
          .catch((error) => {
            console.error("Error processing shares:", error);
            Alert.alert("Error", "Failed to process shares.");
          });
      })
      .catch((error) => {
        console.error("Error fetching admin users:", error);
        Alert.alert("Error", "Failed to retrieve admin users.");
      });
  };

  const saveToKeystore = (data) => {
    console.log("Saving data to Keystore:", data);
    // Implement Android Keystore integration here
  };

  const handleDecryptPaper = () => {
    id = "6752958f77e6b9809f823327";
    axios.get(`http://192.168.199.97:5000/api/paper/${id}`).then((response) => {
        console.log(response)
        console.log(response.headers);
      setPaperText(response.data);
    }).catch((error) => {console.log(error)});
  };

  return (
    <View style={styles.container}>
      <Button title="Generate Polynomials and Shares" onPress={generatePolynomialsAndShares} />
      <Button title="Get Admin Shares" onPress={getAllAdminsAndShares} color="blue" />
      <Button title="Decrypt Paper" onPress={handleDecryptPaper} color="blue" />
      {sharesData && (
        <View>
          <Text>Stored Share Data: {sharesData}</Text>
        </View>
      )}
      {/* {
        paperText && (
          <View>
            <Text>Decrypted Paper:</Text>
            <Text>{paperText}</Text>
          </View>
        )   
      } */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});