import type { NextPage } from "next";
import React, { useState, useRef } from "react";
import styles from "../../styles/page/split.module.scss";
import { styled } from "@mui/material/styles";
import Slider from "@mui/material/Slider";
import Switch from "@mui/material/Switch";
import quote from "../../asset/quote.png";
import AutorenewIcon from '@mui/icons-material/Autorenew';
import Image from "next/image";
import axios from "axios";
import WalletContext from '../../context/WalletContext';
import {treaseryWallet, API, SOL} from '../../config';
import { Grid, Stack,Box } from '@mui/material';
import { useRouter } from "next/router";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DownloadExcel } from "react-excel-export";
import { Connection, clusterApiUrl, Transaction, LAMPORTS_PER_SOL, SystemProgram, PublicKey, Keypair } from "@solana/web3.js";
import { getParsedNftAccountsByOwner } from "@nfteyez/sol-rayz";

const SOLANA_MAINNET = "https://api.mainnet-beta.solana.com";

toast.configure();

var splitData:any = [];

const Home: NextPage = () => {
  const setWallet = React.useContext(WalletContext);

  const [label, setLabel] = useState("");
  const [labelIndex, setLabelIndex] = useState(0);
  const [labelName, setLabelName] = useState("");
  const [yourWallet, setYourWallet] = useState("Your Split Address(...)");
  const [projectName, setProjectName] = useState("PROJECT NAME");
  const [websiteName, setWebsiteName] = useState("WEBSITE NAME");
  const [projectDescription, setProjectDescription] = useState("PROJECT DESCRIPTION");
  const [assets, setAssets] = useState("HOW MANY ASSETS?");
  const [cost, setCost] = useState("Cost");
  const [count, setCount] = useState("10");
  const [ethNetwork, setEthNetwork] = useState(false);
  const [solNetwork, setSolNetwork] = useState(true);
  const [percentageCheck, setPercentageCheck] = useState(true);
  const [hardcapCheck, setHardcapCheck] = useState(false);
  const [splitRate, setSplitRate] = useState("");
  const [splitAddress, setSplitAddress] = useState("");

  const [temp, setTemp] = useState(["Wallet 1", "Wallet 2"]);
  const [tempRarity, setTempRarity] = useState(["",""]);
  const [walletArray, setWalletArray] = useState(["",""]);
  const [hardCapCheckArray, setHardCapCheckArray] = useState(["",""]);
  const [hardCapRateArray, setHardCapRateArray] = useState(["",""]);
  const [nftExist, setNftExist] = useState(false);
  const [nftCount, setNftCount] = useState(0);
  const [totalSOL, setTotalSOL] = useState<any>(0);

  const router = useRouter();

  const prevHandle = async () => {
    let index = labelIndex-1<=0? 0:labelIndex-1;
    changeLabelIndex(index);
  }

  const nextHandle = async () => {
    if(labelIndex+1>=walletArray.length) return
    changeLabelIndex(labelIndex+1);
  }

  const saveAddedWallet = async () => {
    try{
       await axios.post(`${API}/api/split/add-wallet`, {wallet:setWallet.address, wallets: walletArray, hardcapChecks: hardCapCheckArray, hardcapsRate: hardCapRateArray,});
    }
    catch(err){
      console.log(err);
    }
  } 

  const changeLabelIndex = async (index:any) => {
    let tmp = [];
    console.log(index)
    console.log(splitAddress)
    console.log(walletArray)
    if(index==labelIndex){
      tmp = walletArray; tmp.splice(index, 1, `${splitAddress}`);
      console.log(tmp)
      setWalletArray([]); setWalletArray(tmp)
      tmp = hardCapCheckArray;  tmp.splice(index, 1, `${hardcapCheck}`);
      console.log(tmp)
      setHardCapCheckArray([]); setHardCapCheckArray(tmp)
      tmp = hardCapRateArray; tmp.splice(index, 1, `${splitRate}`);
      console.log(tmp)
      setHardCapRateArray([]); setHardCapRateArray(tmp)
      setTempRarity([]); setTempRarity(tmp)
      console.log("hardCapCheckArray")
      console.log(hardCapCheckArray)
      if(!setWallet.address)return;
      await saveAddedWallet();
    }
    setLabelIndex(index);
    setSplitAddress(walletArray[index])
    setSplitRate(hardCapRateArray[index])

    if (hardCapCheckArray[index] == "true") {setHardcapCheck(true);  setPercentageCheck(false)}
    else{ setHardcapCheck(false);  setPercentageCheck(true)}

    splitData=[]
    for( let i = 0; i< walletArray.length; i++){
      const data = {
        "splitAddress":walletArray[i],
        "Percentage/Hardcap": hardCapRateArray[i]
      };
      splitData.push(data)
    }
   
  }

  const removeLabel = async (index:any) => {
    temp.splice(index, 1); setTemp((temp) => [...temp]);
    walletArray.splice(index, 1);setWalletArray((walletArray) => [...walletArray]);
    hardCapCheckArray.splice(index, 1);setHardCapCheckArray((hardCapCheckArray) => [...hardCapCheckArray]);
    hardCapRateArray.splice(index, 1);setHardCapRateArray((hardCapRateArray) => [...hardCapRateArray]);
    tempRarity.splice(index, 1);setTempRarity((tempRarity) => [...tempRarity]);
    toast.success('Removing Wallet Success!', { position: toast.POSITION.TOP_RIGHT, autoClose: 3000 })
  }
 
  const fetchWalletForNFTs = async (address: string) => {
    const connection = new Connection(SOLANA_MAINNET, "confirmed");
    const nftAccounts = await getParsedNftAccountsByOwner({publicAddress: address , connection: connection});
    return nftAccounts;
  }

  const getProvider = async () => {
    if ("solana" in window) {
      const provider = window.solana as any;
      const { solana } = window;

      if (provider.isPhantom) {
        await solana.connect();
        return provider;
      }
    } else {
      window.open("https://www.phantom.app/", "_blank");
    }
  };

  const calculateSOL = async () => {
    let nftCNT = nftCount * 250;
    if((Number(count)-nftCNT)<100) return -1;
    if((Number(count)-nftCNT)>=100 && (Number(count)-nftCNT)<250) {
        return 1;
    }
    if((Number(count)-nftCNT)>=250 && (Number(count)-nftCNT)<500) {
        return 2;
    }
    if((Number(count)-nftCNT)>=500 && (Number(count)-nftCNT)<1000){
        return 3;
    }
    if((Number(count)-nftCNT)>=1000 && (Number(count)-nftCNT)<5000){
        return 4;
    }
    if((Number(count)-nftCNT)>=5000){
        return 5;
    }
  }

  const sendSol = async () => {
    var provider = await getProvider();
    const treasueryWallet = new PublicKey(treaseryWallet);
    // const connection = new Connection(SOLANA_MAINNET, "confirmed");
    // Establishing connection
    var connection = new Connection(
      clusterApiUrl('devnet'),"confirmed"
    );
    let sol:any = await calculateSOL();
    if(sol>0){
      try{
        const amount = LAMPORTS_PER_SOL * parseFloat(sol);
        var transaction = new Transaction().add(
          SystemProgram.transfer({
              fromPubkey: provider.publicKey,
              toPubkey: treasueryWallet,
              lamports: amount,
          })
        );
        if(transaction) {
          console.log("Txn created successfully");
        }
        // Setting the variables for the transaction
        transaction.feePayer = provider.publicKey;
        let blockhashObj = await connection.getRecentBlockhash();
        transaction.recentBlockhash = await blockhashObj.blockhash;
        // Request creator to sign the transaction (allow the transaction)
        let signed = await provider.signTransaction(transaction);
        // The signature is generated
        let signature = await connection.sendRawTransaction(signed.serialize());
        // Confirm whether the transaction went through or not
        await connection.confirmTransaction(signature);
        toast.success('SOL Sending Success!', { position: toast.POSITION.TOP_RIGHT, autoClose: 3000 })
        return transaction.recentBlockhash;
      }catch(err){
        toast.error('SOL Sending Error!', { position: toast.POSITION.TOP_RIGHT, autoClose: 3000 })
        console.log(err);
      }
    }
  }

  const createWalletHandle = async () => {
    try{
      // await sendSol();
      let solEth = "sol";
      if(solNetwork){
        solEth = "sol";
      }else if(ethNetwork){
        solEth = "eth";
      }
      const data = {
        "projectName": projectName,
        "websiteName": websiteName,
        "projectDescription": projectDescription,
        "assets": assets,
        "cost": cost,
        "network": solEth,
        "wallet": setWallet.address,
      }

      toast.info('Creating wallet for split!', { position: toast.POSITION.TOP_RIGHT, autoClose: 3000 })
      const result = await axios.post(`${API}/api/split/create-wallet`, data);
      if(result.data.status=="Success"){
        toast.success('Creating Success!', { position: toast.POSITION.TOP_RIGHT, autoClose: 3000 })
        return;
      }
      else if(result.data.status=="Exist"){
        toast.info('Already Exist', { position: toast.POSITION.TOP_RIGHT, autoClose: 3000 })
        return;
      }
      else if(result.data.status=="Error"){
        toast.error('Creating Error!', { position: toast.POSITION.TOP_RIGHT, autoClose: 3000 })
        return;
      }
    }catch(err){
      toast.error('Creating Error!', { position: toast.POSITION.TOP_RIGHT, autoClose: 3000 })
      console.log("Creating is Failed")
    }
  }

  const splitHandle = async () => {
    try{
      toast.success('Test Spliting....', { position: toast.POSITION.TOP_RIGHT, autoClose: 3000 });
      await axios.post(`${API}/api/split/test`, {wallet:setWallet.address});
      toast.success('Spliting Success!', { position: toast.POSITION.TOP_RIGHT, autoClose: 3000 });
    }catch(err){
      toast.error('Test Spliting Error!', { position: toast.POSITION.TOP_RIGHT, autoClose: 3000 });
      console.log("Spliting is Failed")
    }
  }

  const exportHandle = async () => {
    try{
      toast.success('Exporting...', { position: toast.POSITION.TOP_RIGHT, autoClose: 3000 })
      await axios.post(`${API}/api/split/export`, {wallet:setWallet.address});
      toast.success('Exporting Success!', { position: toast.POSITION.TOP_RIGHT, autoClose: 3000 })
    }catch(err){
      toast.error('Exporting Error!', { position: toast.POSITION.TOP_RIGHT, autoClose: 3000 })
      console.log("Exporting is Failed")
    }
  }

  const checkEth = async (e:any) => {
    try{
      toast.success('Coming Soon!', { position: toast.POSITION.TOP_RIGHT, autoClose: 3000 })
        setEthNetwork(false);
        setSolNetwork(true)
    }catch(err){
      console.log("Failed")
    }
  }

  const checkSOL = async (e:any) => {
    try{
      if(e.target.checked){
        setSolNetwork(true);
        setEthNetwork(false);
      }else{
        setEthNetwork(true);
        setSolNetwork(false);
      }
    
    }catch(err){
      console.log("Failed")
    }
  }

  const checkPercentage = async (e:any) => {
    try{
      console.log(e.target.checked)
      if(e.target.checked){
        setHardcapCheck(false);
        setPercentageCheck(true);
      }else{
        setHardcapCheck(true);
        setPercentageCheck(false);
      }
    }catch(err){
      console.log("Failed")
    }
  }

  const checkHardcap = async (e:any) => {
    try{
      console.log(e.target.checked)
      if(e.target.checked){
        setHardcapCheck(true);
        setPercentageCheck(false);
      }else{
        setHardcapCheck(false);
        setPercentageCheck(true);
      }

    }catch(err){
      console.log("Failed")
    }
  }

  const checkNFT = async () => {
    try{
      if(!setWallet.address) return;
      const result = await fetchWalletForNFTs(setWallet.address);
      console.log(result);
      let nftCount = 0;
      for(let i = 0; i < result.length; i++){
        if( result[i].updateAuthority == 'your update authority'){
          setNftExist(true);
          nftCount++;
          continue;
        }
      }
      toast.success(`Have ${nftCount} DMH NFT!`, { position: toast.POSITION.TOP_RIGHT, autoClose: 3000 })
      setNftCount(nftCount)
    }
    catch(err){
      toast.error('DMH NFT Checking Error!', { position: toast.POSITION.TOP_RIGHT, autoClose: 3000 })
      console.log(err);
    }
  }

  const getSplitInfo = async (address:any) => {
    try{
      const result = await axios.post(`${API}/api/split/get-wallet`, {wallet: address});
      console.log(result.data);
      console.log(result.data.splitAddress)
      setYourWallet(result.data.splitAddress)
      setProjectName(result.data.projectName)
      setProjectDescription(result.data.projectDescription)
      setWebsiteName(result.data.websiteName)
      setAssets(result.data.assets)
      setCost(result.data.cost)
      if(result.data.assets&&result.data.cost&&!isNaN(result.data.assets)&&!isNaN(result.data.cost)){
        setTotalSOL((result.data.assets*result.data.cost).toFixed(2))
      }
      if(result.data.addedWallet.splitWallets.length>0){
        setWalletArray([]); setWalletArray(result.data.addedWallet.splitWallets)
        setHardCapCheckArray([]); setHardCapCheckArray(result.data.addedWallet.hardcapChecks)
        setHardCapRateArray([]); setHardCapRateArray(result.data.addedWallet.hardcapsRate)
        setTempRarity([]); setTempRarity(result.data.addedWallet.hardcapsRate)
        console.log(result.data.addedWallet)
      }

      splitData=[]
      let tmp:any = [];
      for( let i = 0; i< result.data.addedWallet.splitWallets.length; i++){
        const data = {
          "splitAddress": result.data.addedWallet.splitWallets[i],
          "Percentage/Hardcap": result.data.addedWallet.hardcapsRate[i]
        };
        tmp.push("Wallet " + Number(i + 1));
        splitData.push(data)
        console.log("tel")
      }
      console.log(tmp)
      setTemp([]);  setTemp(tmp);
      
    }catch(err){
      console.log("Failed")
    }
  }

  React.useEffect(() => {
      checkNFT();
      if(!setWallet.address) router.push("/");
  }, []);

  React.useEffect(() => {
    if(setWallet.address) {
      getSplitInfo(setWallet.address);
    }
  }, [setWallet.address]);


  const popUp = () => {
    var len = "Wallet " + Number(temp.length + 1);
    setTemp((temp) => [...temp, len]);
    setWalletArray((walletArray) => [...walletArray, ""]);
    setHardCapCheckArray((hardCapCheckArray) => [...hardCapCheckArray, "true"]);
    setHardCapRateArray((hardCapRateArray) => [...hardCapRateArray, ""]);
    setTempRarity((tempRarity) => [...tempRarity, ""]);
  };
  
  return (
    <div className={styles.main}>
      <div className={styles.border}>
        <div className={styles.body}>
        <div className={styles.bodyTop}>TEXAGLO COLLECTION</div>
        <div className={styles.bodyTop1}>SPLIT YOUR PAYMENT</div>
        
      
        <div>
        <Grid>
          <Grid xs={12} item container>
            <Grid xs={12} md={2} item></Grid>
            <Grid xs={12} md={8} item>
              <input className={styles.customItem} value={yourWallet}  onChange={(e) => {setYourWallet(e.target.value)}}/>
            </Grid>
            <Grid xs={12} md={2} item></Grid>
            
            <Grid xs={12} md={2} item></Grid>
            <Grid xs={12} md={8} item container spacing={2}>
              <Grid xs={12} md ={6} item>
                <input className={styles.customItem} value={projectName}  onChange={(e) => {setProjectName(e.target.value)}}/>
              </Grid>
              <Grid xs={12} md={6} item>
                <input className={styles.customItem} value={websiteName} onChange={(e) => { setWebsiteName(e.target.value); }} />
              </Grid>
            </Grid>
            <Grid xs={12} md={2} item></Grid>
            </Grid>

          <Grid xs={12} item container>
            <Grid xs={12} md={2} item></Grid>
            <Grid xs={12} md={8} item>
              <Grid xs={12} md={12} item container spacing={2}>
                <Grid xs={12} md={6} item>
                  <input className = {styles.customItem} value={projectDescription}onChange={(e) => {setProjectDescription(e.target.value) }} />
                </Grid>
                <Grid xs={12} md={6} item>
                  <Grid xs={12} md={12} item container spacing={2}>
                      <Grid xs={12} md={6} item>
                        <input className={styles.customItem} value={assets} onChange={(e) => { setAssets(e.target.value); }}/>
                      </Grid>
                      <Grid xs={12} md={6} item>
                        <input className={styles.customItem} value={cost} onChange={(e) => { setCost(e.target.value); }}/>
                      </Grid>
                  </Grid>

                  <Grid xs={12} md={12} item>
                    <label style={{fontSize:'11px', fontWeight:'bold', color:'#AD94B7',}}>
                      CHOOSE YOUR BLOCKCHAIN
                    </label>
                </Grid>
                <Grid xs={12} md={12} item container>
                    <Grid xs={2} md={2} item>
                      <input type="checkbox" checked = {ethNetwork} onChange={ (e) => { checkEth(e) }} className={styles.customeCheck}/>
                    </Grid>

                    <Grid xs={4} md={4} item>
                      <label style={{ color: "#874D9E", font: "normal normal bold 10px/11px Helvetica Neue"}}>ETHEREUM</label>
                    </Grid>

                    <Grid xs={2} md={2} item>
                    <input type="checkbox" checked = {solNetwork} onChange={ (e) => { checkSOL(e) }} className={styles.customeCheck}/>
                    </Grid>

                    <Grid xs={4} md={4} item>
                      <label style={{ color: "#874D9E", font: "normal normal bold 10px/11px Helvetica Neue"}}>SOLANA</label>
                    </Grid>
                </Grid>
              </Grid>
                
            </Grid>
            </Grid>
            <Grid xs={12} md={2} item></Grid>
          </Grid>

          <Grid xs={12} md={12} item></Grid>
        </Grid>
        </div>
         
          <div className={styles.bodyMain}>

            <div className={styles.left}>
              <div className={styles.leftContainer}>
              
              {temp.map((value, index) => (
                <div key={index}>
                  <Grid xs={12} md={12} item container>
                    <Grid xs={2} md={2} className={styles.alignCenter} item>
                      <div  onClick={() => { removeLabel(index);}} className={styles.letterButton}>-</div>
                    </Grid>

                    <Grid xs={8} md={8} className={styles.alignCenter} item>
                      <button className={styles.layerButton} onClick={() => { changeLabelIndex(index); setLabelName(value);}}>{value.toUpperCase()}</button>
                    </Grid>

                    <Grid xs={2} md={2} className={styles.alignCenter} item>
                    </Grid>
                  </Grid>
                </div>
              ))}

              </div>
              <div className={styles.alignCenter}>
                  <button onClick={() => popUp()} className={styles.shadowButton}>ADD A WALLET</button>
              </div>
            </div>

            <div className={styles.center}>       
            
            <Stack direction="row" className={styles.centerContainer} sx={{padding: '33px 33px'}}>                
                <Stack alignItems="center">
                  <Box sx={{cursor:"pointer"}}>
                    <div className={styles.arrowUp} onClick={prevHandle}></div>                  
                  </Box>
                  <Box sx={{cursor:"pointer"}}>
                    <label className={styles.upDownTitle} onClick={prevHandle}>PREVIOUS</label>
                  </Box>
                </Stack>
                <Stack alignItems="center" justifyContent="space-between" width={'100%'}>                  
                  <Box borderBottom={2} padding={1}>
                    <label className={styles.rarityTitle}>Wallet {labelIndex + 1} </label>
                  </Box>
                  <Box>
                    <label className={styles.rarityTitle}>Wallet Address</label>
                  </Box>
                  <Box>
                    <input className = {styles.customItemCenter} value={splitAddress} onChange={(e) => {setSplitAddress(e.target.value) }} />
                  </Box>
                  <Box>
                    <label style={{fontSize:'11px', fontWeight:'bold', color:'#AD94B7',}}>
                        Split Method
                    </label>
                  </Box>
                  {/* <Box position={"relative"}>
                    <Box>
                    <input type="checkbox" ref = {solCheck} checked = {solNetwork} onChange={ (e) => { checkSOL(e) }} className={styles.customCenterCheck}/>
                    <label style={{ color: "#874D9E", font: "normal normal bold 10px/11px Helvetica Neue"}} className={styles.customCenterHardcap}>Hardcap</label>
                    </Box>
                    <Box>
                    <input type="checkbox" ref = {solCheck} checked = {solNetwork} onChange={ (e) => { checkSOL(e) }} className={styles.customCenterCheck}/>
                    <label style={{ color: "#874D9E", font: "normal normal bold 10px/11px Helvetica Neue"}} className={styles.customCenterPercentage}>Percentage</label>
                  </Box>
                  </Box> */}
                  <Grid xs={12} md={12} item container>
                    <Grid xs={2} md={2} item>
                      <input type="checkbox" checked = {hardcapCheck} onChange={ (e) => { checkHardcap(e) }} className={styles.customCenterCheck}/>
                    </Grid>
                    <Grid xs={4} md={4} item>
                      <label style={{ color: "#874D9E", font: "normal normal bold 10px/11px Helvetica Neue"}}>Hardcap</label>
                    </Grid>
                    <Grid xs={2} md={2} item>
                    <input type="checkbox" checked = {percentageCheck} onChange={ (e) => { checkPercentage(e) }} className={styles.customCenterCheck}/>
                    </Grid>
                    <Grid xs={4}md={4} item>
                      <label style={{ color: "#874D9E", font: "normal normal bold 10px/11px Helvetica Neue"}}>Percentage</label>
                    </Grid>
                  </Grid>
                  <Box>
                    <label className={styles.rarityTitle}>Hardcap/Percentage</label>
                  </Box>
                  <Box>
                    <input className = {styles.customItemCenter} value={splitRate} onChange={(e) => {setSplitRate(e.target.value) }} />
                  </Box>
                </Stack>
                <Stack alignItems="center">
                  <Box sx={{cursor:"pointer"}}>
                    <div className={styles.arrowDown} onClick={nextHandle}></div>
                  </Box>
                  <Box sx={{cursor:"pointer"}}>
                    <label className={styles.upDownTitle} onClick={nextHandle}>NEXT</label>
                  </Box>
                </Stack>
            </Stack>

              <div className={styles.tapGroup}>
                <div className={styles.setTap}>
                  <button   onClick={splitHandle}>Test Split</button>
                  {/* <button  onClick={exportHandle}> Export Excel</button> */}
                  <DownloadExcel data={splitData} buttonLabel="Export Excel"  fileName={yourWallet} className="export-button"/>
                  <button onClick={createWalletHandle}>Create Wallet</button>
                </div>
              </div>
            </div>

            <div className={styles.right}>
              <div className={styles.traitState}>
                <label className={styles.rarityTitle}>SPLITS OVERVIEW</label>
                  {tempRarity.map((value, index) => (
                    <div  key={index}>
                      <Grid md={12} xs={12} item container>
                        <Grid md={12} xs={12} item>
                          <span style={{color:'#874D9E',}}>Wallet {++index}</span>
                        </Grid>

                        <Grid xs={12} md={12} item container>
                          <Grid xs={12} md={9} item>
                          <Slider
                          key={index}
                          aria-label="Trait_1"
                          size="small"
                          value={Number(value)>0?Number(value):0}
                          sx={{
                            width: "90%",
                            color: "#874D9E",
                          }}
                          // onChange={ (e, val) => {rarityChange(val, index) }}
                        />
                        </Grid>
                        <Grid xs={12} md={3} item>
                        <span style={{color:'#874D9E',}}>{value?value:0}
                        {hardCapCheckArray[index-1] == "true"?' sol':' %'}
                        </span>
                        </Grid>
                        </Grid>

                      </Grid>
                    </div>
                  ))}
              </div>
              <div className={styles.splitCount}>
                <label className={styles.rarityTitle1}>SPLITS</label>
                <label className={styles.rarityTitle1}>{temp.length}</label>
              </div>
              <div className={styles.splitBalance}>
                <label className={styles.rarityTitle1}>TOTAL ETH/SOL</label>
                <label className={styles.rarityTitle1}>{totalSOL}</label>
              </div>              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
