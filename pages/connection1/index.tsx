import type { NextPage } from "next";
import React, { useState, useRef } from "react";
import styles from "../../styles/page/page1.module.scss";
import { styled } from "@mui/material/styles";
import Slider from "@mui/material/Slider";
import Switch from "@mui/material/Switch";
import quote from "../../asset/quote.png";
import AutorenewIcon from '@mui/icons-material/Autorenew';
import Image from "next/image";
import axios from "axios";
import WalletContext from '../../context/WalletContext';
import {treaseryWallet, API, SOL} from '../../config';
import { Grid } from '@mui/material';
import { useRouter } from "next/router";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Connection, clusterApiUrl, Transaction, LAMPORTS_PER_SOL, SystemProgram, PublicKey, Keypair } from "@solana/web3.js";
import { getParsedNftAccountsByOwner } from "@nfteyez/sol-rayz";

const SOLANA_MAINNET = "https://api.mainnet-beta.solana.com";

toast.configure();

const Home: NextPage = () => {
  const setWallet = React.useContext(WalletContext);
  let ethCheck = useRef<HTMLInputElement | null>(null);
  let solCheck = useRef<HTMLInputElement | null>(null);


  const [open, setOpen] = React.useState(false);
  const [label, setLabel] = useState("");
  const [labelIndex, setLabelIndex] = useState(0);
  const [labelName, setLabelName] = useState("");
  const [projectName, setProjectName] = useState("projectName");
  const [websiteName, setWebsiteName] = useState("websiteName");
  const [projectDescription, setProjectDescription] = useState("projectDescription");
  const [baseURI, setBaseURI] = useState("baseURI");
  const [x, setX] = useState("100");
  const [y, setY] = useState("100");
  const [count, setCount] = useState("10");
  const [ethNetwork, setEthNetwork] = useState(false);
  const [solNetwork, setSolNetwork] = useState(true);
  const [temp, setTemp] = useState(["Layer 1", "Layer 2"]);
  const [tempRarity, setTempRarity] = useState(["","","", ""]);
  const [nftExist, setNftExist] = useState(false);
  const [nftCount, setNftCount] = useState(0);
  const [imageUrl, setImageUrl] = useState("");
  const [generateStatus, setGenerateStatus] = useState(false);
  
  const router = useRouter();

  const fileBrowseHandler = async (event:any) => {
    if(!labelName){
      toast.info('"Please select Layer!', { position: toast.POSITION.TOP_RIGHT, autoClose: 3000 })
      return;
    }
    const files = event.target.files;

    for (let i = 0; i < files.length; i++) {
      const form = new FormData();
      form.append('image', files[i]);
      form.append('pid', labelName);      
      form.append('address', setWallet.address);      
      let value = URL.createObjectURL(files[i]);
      setImageUrl(value);
      await upload(form);
      setTempRarity((tempRarity) => [...tempRarity, "0"]);
    }
  };
  
  const changeLabelIndex = async (index:any) => {
    await renameFiles(tempRarity, temp[labelIndex]);
    setLabelIndex(index);
    await getFilesInDirectory(index);
  }

  const removeLabel = async (index:any) => {
    await removeDirectory(index);
    temp.splice(index, 1);
    setTemp((temp) => [...temp]);
    toast.success('Removing Layer Success!', { position: toast.POSITION.TOP_RIGHT, autoClose: 3000 })
  }

  const changeLayername = async (value:any) => {
    setLabelName(value);    
    await renameDirectory(temp[labelIndex], value);
    // toast.success('Renaming Layer Success!', { position: toast.POSITION.TOP_RIGHT, autoClose: 3000 })
    if (labelIndex >= 0) {
      temp.splice(labelIndex, 1, value);
      setTemp(temp);
    }
  };

  const rarityChange = async (value: any, index:any) => {
    tempRarity.splice(index-1, 1, `${value}`);
    setTempRarity((tempRarity) => [...tempRarity]);
  }

  const getFilesInDirectory = async (index:any) => {
    try{
      setTempRarity([]);
      const result_status:any = await axios.post(`${API}/api/attachment/getfilelist`, {address:setWallet.address, layername: temp[index]});
      for(let i:any = 0; i<Number(result_status.data.count.length); i++){
        if(result_status.data.status=="OK"){
          let len = `${result_status.data.count[i].slice(result_status.data.count[i].lastIndexOf("#")+1, result_status.data.count[i].lastIndexOf("."))}`;
          setTempRarity((tempRarity) => [...tempRarity, len]);
        }else{
          setTempRarity([]);
        }          
      }
    }
    catch(err){
      console.log(err);
    }
  }

  const removeDirectory = async (index:any) => {
    try{
      await axios.post(`${API}/api/attachment/removeDirectory`, {address:setWallet.address, layername: temp[index]});      
    }catch(err){
      console.log(err);
    }
  }

  const renameDirectory = async (old:any, newValue:any) => {
    try{
      await axios.post(`${API}/api/attachment/renameDirectory`, {address:setWallet.address, old: old, new:newValue});      
    }catch(err){
      console.log(err);
    }
  }

  const renameFiles = async (raritys:any, layername:any) => {
    try{
      await axios.post(`${API}/api/attachment/renameFiles`, {address:setWallet.address, raritys: raritys, layername:layername});      
    }catch(err){
      console.log(err);
    }
  }

  const upload = async (formImage:FormData) => {
    try{
      await axios.post(`${API}/api/attachment/upload`, formImage);
      toast.success('Image Upload Success!', { position: toast.POSITION.TOP_RIGHT, autoClose: 3000 })
    }
    catch(err){
      toast.success('Image Upload Error!', { position: toast.POSITION.TOP_RIGHT, autoClose: 3000 })
      console.log(err);
    }
  }

  const filedownload = async (url: any) => {
    const resp = await fetch(url);
    let blob = URL.createObjectURL(await resp.blob());

    const a = document.createElement('a')
    a.href = blob;
    a.download = url.split('/').pop()
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a);
  }

  const download = async () => {
    try{
      if(!generateStatus) {
        toast.info('Please click the GENERATE button!', { position: toast.POSITION.TOP_RIGHT, autoClose: 3000 })
        return;
      }
      await filedownload(`${API}/${setWallet.address}/build.zip`);
      toast.success('Download Success!', { position: toast.POSITION.TOP_RIGHT, autoClose: 3000 })
    }
    catch(err){
      toast.error('Download Error!', { position: toast.POSITION.TOP_RIGHT, autoClose: 3000 })
      console.log(err);
    }
  }

  const fetchWalletForNFTs = async (address: string) => {
    const wallet = new PublicKey(address);
    const connection = new Connection(SOLANA_MAINNET, "confirmed");
    const nftAccounts = await getParsedNftAccountsByOwner({publicAddress: address , connection: connection});
    console.log(`\n${nftAccounts.length} nfts determined from this wallet`);
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

  const generateArt = async () => {
    if(tempRarity.length) await renameFiles(tempRarity, temp[labelIndex]);
    try{
      await sendSol();
      let data:any = [];
      data.push({"pid":labelName});
      data.push({"projectName":projectName});
      data.push({"websiteName":websiteName});
      data.push({"projectDescription":projectDescription});
      data.push({"baseURI":baseURI});
      data.push({"x":x});
      data.push({"y":y});
      data.push({"count":count});
      if(solNetwork){
        data.push({"network":"sol"});
      }else if(ethNetwork){
        data.push({"network":"eth"});
      }else{
        data.push({"network":"sol"});
      }
      data.push({"layers":JSON.stringify(temp)});
      data.push({"address":setWallet.address});
      toast.info('Please wait generation!', { position: toast.POSITION.TOP_RIGHT, autoClose: 3000 })
      const result = await axios.post(`${API}/api/attachment/generateArt`, {data:data});
      if(result.data.status=="NO"){
        toast.info('Please set rarity of images!', { position: toast.POSITION.TOP_RIGHT, autoClose: 3000 })
        return;
      }
      setGenerateStatus(true);
      toast.success('Generation Success!', { position: toast.POSITION.TOP_RIGHT, autoClose: 3000 })
    }catch(err){
      toast.error('Generation Error!', { position: toast.POSITION.TOP_RIGHT, autoClose: 3000 })
      console.log("generateArt is Failed")
    }
  }

  const preview = async () => {
    try{
      if(!generateStatus) {
        toast.info('Please click the GENERATE button!', { position: toast.POSITION.TOP_RIGHT, autoClose: 3000 })
        return;
      }
      await axios.post(`${API}/api/attachment/preview`, {address:setWallet.address});
      const resp = await fetch(`${API}/${setWallet.address}/preview.png`);
      let url = URL.createObjectURL(await resp.blob());
      setImageUrl(url);
      toast.success('Making Preview Success!', { position: toast.POSITION.TOP_RIGHT, autoClose: 3000 });
    }catch(err){
      toast.error('Making Preview Error!', { position: toast.POSITION.TOP_RIGHT, autoClose: 3000 });
      console.log("makeGif is Failed")
    }
  }

  const makeGif = async () => {
    try{
      if(!generateStatus) {
        toast.info('Please click the GENERATE button!', { position: toast.POSITION.TOP_RIGHT, autoClose: 3000 })
        return;
      }
      await axios.post(`${API}/api/attachment/makeGif`, {address:setWallet.address});
      const resp = await fetch(`${API}/${setWallet.address}/preview.gif`);
      let url = URL.createObjectURL(await resp.blob());
      setImageUrl(url);
      toast.success('Making Gif Success!', { position: toast.POSITION.TOP_RIGHT, autoClose: 3000 })
    }catch(err){
      toast.error('Making Gif Error!', { position: toast.POSITION.TOP_RIGHT, autoClose: 3000 })
      console.log("makeGif is Failed")
    }
  }

  const checkEth = async (e:any) => {
    try{
     
      if(e.target.checked){
        setEthNetwork(true);
        if (solNetwork) {
          setSolNetwork(false)
        }
      }else{
        setEthNetwork(false);
      }

    }catch(err){
      console.log("Failed")
    }
  }

  const checkSOL = async (e:any) => {
    try{
      if(e.target.checked){
        setSolNetwork(true);
        if (ethNetwork) {
          setEthNetwork(false);
        }
      }else{
        setSolNetwork(false);
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

  const descriptionElementRef = React.useRef<HTMLElement>(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  React.useEffect(() => {
      checkNFT();
      if(!setWallet.address) router.push("/");
  }, []);


  const popUp = () => {
    var len = "Layer " + Number(temp.length + 1);
    setTemp((temp) => [...temp, len]);
  };
  
  return (
    <div className={styles.main}>
      <div className={styles.border}>
        <div className={styles.body}>
        <div className={styles.bodyTop}>TEXAGLO COLLECTION</div>
        <div className={styles.bodyTop1}>ART ASSEMBLY TOOL</div>
      
        <div>
        <Grid 
        >
          <Grid xs={12}  container
          >
            <Grid xs={12} md={2}></Grid>
            <Grid xs={12} md ={3}
            >
              <input
                  className={styles.customItem}
                  defaultValue="PROJECT NAME"
                  onChange={(e) => {
                    setProjectName(e.target.value)
                  }}
                />
            </Grid>
            <Grid xs={12} md={3}
            >
              <input
                    className={styles.customItem}
                    defaultValue="WEBSITE NAME"
                    onChange={(e) => {
                      setWebsiteName(e.target.value);
                    }}
              />
            </Grid>
            <Grid xs={12} md={3}>
              <input
                    className={styles.customItem}
                    defaultValue="BASE URI"
                    onChange={(e) => {
                      setBaseURI(e.target.value);
                    }}
                />
            </Grid>
            <Grid xs={12} md={1}>
              <button onClick={generateArt} className={styles.refreshButton}><AutorenewIcon/></button>
            </Grid>
          </Grid>

          <Grid xs={12} container>
            <Grid xs={12} md={2}></Grid>
            <Grid xs={12} md={9}>
              <Grid xs={12} md={12} container>
                <Grid xs={12} md={6}
                >
                  <input 
                    className = {styles.customItem}
                    defaultValue="PROJECT DESCRIPTION"
                    onChange={(e) => {
                      setProjectDescription(e.target.value)
                    }}
                  />
                </Grid>
                <Grid xs={12} md={6} container>
                  <Grid xs={12} md={12}>
                    <input
                          className={styles.customItem}
                          defaultValue="HOW MANY UNQUE PRICE DO YOU WANT?"
                          onChange={(e) => {
                            if(!generateStatus)setCount(e.target.value);
                            else     toast.success(`Please login again`, { position: toast.POSITION.TOP_RIGHT, autoClose: 3000 })
                          }}
                      />
                </Grid>
                <Grid xs={12} md={12}>
                    <label
                      style={{fontSize:'11px', fontWeight:'bold', color:'rgb(175 142 189);',}}
                    >
                      CHOOSE YOUR BLOCKCHAIN
                    </label>
                </Grid>

              <Grid xs={12} md={12} container>
                <Grid xs={2} md={2}>
                  <input 
                    type="checkbox"
                    ref = {ethCheck}
                    checked = {ethNetwork}
                    onChange={ (e) => { checkEth(e) }}
                    className={styles.customeCheck}
                  />
                </Grid>

                <Grid xs={4} md={4}>
                  
                  <label style={{ color: "#874D9E", font: "normal normal bold 10px/11px Helvetica Neue"}}>ETHEREUM</label>
                </Grid>

                <Grid xs={2} md={2}>
                <input
                  type="checkbox"
                  ref = {solCheck}
                  checked = {solNetwork}
                  onChange={ (e) => { checkSOL(e) }}
                  className={styles.customeCheck}
                />
                </Grid>

                <Grid xs={4}md={4}>
                  <label style={{ color: "#874D9E", font: "normal normal bold 10px/11px Helvetica Neue"}}>SOLANA</label>
                </Grid>
                </Grid>
              </Grid>
              </Grid>
            </Grid>
            <Grid xs={12} md={1}></Grid>
          </Grid>

          <Grid xs={12} md={12}></Grid>
        </Grid>
        </div>
         
          <div className={styles.bodyMain}>

            <div className={styles.left}>
              <div className={styles.leftContainer}>
              
              {temp.map((value, index) => (
                <div key={index}>
                  <Grid xs={12} md={12} container>
                    <Grid xs={2} md={2} className={styles.alignCenter}>
                      <div  onClick={() => { removeLabel(index);}} className={styles.letterButton}>-</div>
                    </Grid>

                    <Grid xs={8} md={8} className={styles.alignCenter}>
                      <button 
                      className={styles.layerButton}
                      onClick={() => { changeLabelIndex(index); setLabelName(value);}}>{value.toUpperCase()}</button>
                    </Grid>

                    <Grid xs={2} md={2} className={styles.alignCenter}>
                    <div className={styles.letterButton}>
                        +
                        <input
                              className={styles.fileButton}
                              type="file"
                              onChange={(event) => fileBrowseHandler(event)}
                              multiple
                        />
                    </div>
                    </Grid>
                  </Grid>
                </div>
              ))}

              </div>
              <div className={styles.alignCenter}>
                  <button onClick={() => popUp()} className={styles.shadowButton}>ADD A NEW LAYER</button>
              </div>
            </div>

            <div className={styles.center}>                
              <Image
                className={styles.mainImage}
                src={imageUrl ? imageUrl : quote}
                width={300}
                height={300}
              ></Image>
              <div className={styles.tapGroup}>
                <div className={styles.setTap}>
                  <button   onClick={preview}>PREVIEW</button>
                  <button  onClick={makeGif}> MAKE GIF</button>
                  <button onClick={generateArt}>Generate</button>
                  <button onClick={download}>DOWNLOAD</button>
                </div>
              </div>
            </div>

            <div className={styles.right}>

              <div>
                {<input 
                className={styles.onlyBottom}
                value={labelName} onChange={e => {changeLayername(e.target.value); }}/>}
              </div>

              <div className={styles.dimensionTitle}>
                DIMENSIONS
              </div>
              <div className={styles.xy}>
                <input
                  defaultValue="X"
                  onChange={(e) => {
                    setX(e.target.value);
                  }}
                />
                <input
                  defaultValue="Y"
                  onChange={(e) => {
                    setY(e.target.value)
                  }}
                />
              </div>

              <div className={styles.traitState}>

              <label className={styles.rarityTitle}>TRAIT RARITY</label>
                {tempRarity.map((value, index) => (
                  <div  key={index}>
                    <Grid md={12} xs={12} container>
                      <Grid md={12} xs={12}>
                        <span style={{color:'#874D9E',}}>LAYER {++index}</span>
                      </Grid>

                      <Grid xs={12} md={12} container>
                        <Grid xs={12} md={9}>
                        <Slider
                        key={index}
                        aria-label="Trait_1"
                        size="small"
                        defaultValue={Number(value)>0?Number(value):0}
                        sx={{
                          width: "90%",
                          color: "#874D9E",
                        }}
                        onChange={ (e, val) => {rarityChange(val, index) }}
                      />
                      </Grid>
                      <Grid xs={12} md={3}>
                      <span style={{color:'#874D9E',}}>{value?value:0}%</span>
                      </Grid>
                      </Grid>

                    </Grid>
                  </div>
                ))}
              </div>
              {/* <div className={styles.chainState}>
                <div className={styles.chain1}>
                  <div className={styles.chainTitle}>Ethereum</div>
                  <FormControlLabel
                    style={{ margin: 0 }}
                    control={<MaterialUISwitch onChange={ (e) => { setNetwork(e.target.checked) }} sx={{ m: 1 }} defaultChecked />}
                    label = ""
                  />
                  <span className={styles.chainTitle}>Solana</span>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
