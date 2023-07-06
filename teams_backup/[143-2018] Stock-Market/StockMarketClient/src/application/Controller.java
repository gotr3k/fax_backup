package application;


import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.net.InetAddress;
import java.net.Socket;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Vector;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicBoolean;

import javafx.fxml.FXML;
import javafx.scene.Cursor;
import javafx.scene.control.Button;
import javafx.scene.control.PasswordField;
import javafx.scene.control.TextArea;
import javafx.scene.control.TextField;

public class Controller {
	static final int upperBoundSP=65535;				//upper bound for server socket port
	static final int lowerBoundSP=49512;				//lower bound for server socket port
	
	private Socket socket;
	
	private ObjectOutputStream oos;
	private ObjectInputStream ois;
	
	private AtomicBoolean clientIsRunning=new AtomicBoolean(false);
	@FXML
	private TextField UsernameTextField;
	private String username;
	
	@FXML
	private PasswordField PasswordTextField;
	private String password;

	@FXML
	private TextField ServerIPATextField;			//IP address of the server to which client will try to connect
	private String serverIPA;
	
	@FXML
	private TextField ServerSPTextField;			//server socket to which client will try to connect
	private int serverSP;							//[49512-65535]
	
	@FXML
	private Button ConnectButton;
	
	@FXML
	private Button DisconnectButton;
	
	@FXML
	private Button BuyButton;
	
	@FXML
	private Button SellButton;
	
	@FXML
	private TextArea StocksTextArea;
	
	@FXML
	private TextArea LogsTextArea;
	
	private static DateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
	
	private void textChecker() {
		this.UsernameTextField.setText(String.valueOf(this.username));
		this.PasswordTextField.setText(String.valueOf(this.password));
		this.ServerIPATextField.setText(this.serverIPA);
		this.ServerSPTextField.setText(String.valueOf(this.serverSP));
	}
	
	private void setUI() {
		this.BuyButton.setFocusTraversable(clientIsRunning.get());
		this.BuyButton.setVisible(clientIsRunning.get());
		this.SellButton.setFocusTraversable(clientIsRunning.get());
		this.SellButton.setVisible(clientIsRunning.get());
		this.DisconnectButton.setFocusTraversable(clientIsRunning.get());
		this.DisconnectButton.setVisible(clientIsRunning.get());
		this.ConnectButton.setFocusTraversable(!clientIsRunning.get());
		this.ConnectButton.setVisible(!clientIsRunning.get());
		this.UsernameTextField.setFocusTraversable(!clientIsRunning.get());
		this.UsernameTextField.setEditable(!clientIsRunning.get());
		this.PasswordTextField.setFocusTraversable(!clientIsRunning.get());
		this.PasswordTextField.setEditable(!clientIsRunning.get());
		this.ServerIPATextField.setFocusTraversable(!clientIsRunning.get());
		this.ServerIPATextField.setEditable(!clientIsRunning.get());
		this.ServerSPTextField.setFocusTraversable(!clientIsRunning.get());
		this.ServerSPTextField.setEditable(!clientIsRunning.get());
	}
	
	@FXML
	public void initialize() {		//on form load
		this.serverIPA="127.0.0.1";
		this.ServerIPATextField.setText(this.serverIPA);
		this.serverSP=50000;
		this.ServerSPTextField.setText(String.valueOf(this.serverSP));
		this.username="";
		this.password="";
		
		//set up listeners for all text fields and buttons which will check validity of their peers (useful when user uses mouse or tab to change focus)
		UsernameTextField.focusedProperty().addListener((obs, oldVal, newVal) -> {
			if(newVal) {
				this.textChecker();
			}
		});
				
		PasswordTextField.focusedProperty().addListener((obs, oldVal, newVal) -> {
			if(newVal) {
				this.textChecker();
			}
		});
				
		ServerIPATextField.focusedProperty().addListener((obs, oldVal, newVal) -> {
			if(newVal) {
				this.textChecker();
			}
		});
				
		ServerSPTextField.focusedProperty().addListener((obs, oldVal, newVal) -> {
			if(newVal) {
				this.textChecker();
			}
		});
				
		ConnectButton.focusedProperty().addListener((obs, oldVal, newVal) -> {
			if(newVal) {
				this.textChecker();
			}
		});
				
		DisconnectButton.focusedProperty().addListener((obs, oldVal, newVal) -> {
			if(newVal) {
				this.textChecker();
			}
		});
				
		BuyButton.focusedProperty().addListener((obs, oldVal, newVal) -> {
			if(newVal) {
				this.textChecker();
			}
		});
				
		SellButton.focusedProperty().addListener((obs, oldVal, newVal) -> {
			if(newVal) {
				this.textChecker();
			}
		});
				
		StocksTextArea.focusedProperty().addListener((obs, oldVal, newVal) -> {
			if(newVal) {
				this.textChecker();
			}
		});
				
		LogsTextArea.focusedProperty().addListener((obs, oldVal, newVal) -> {
			if(newVal) {
				this.textChecker();
			}
		});
	}
	
	public void connect() {
		if(this.username!="" && this.password!="") {
			clientIsRunning.set(true);
			try {
				
				this.LogsTextArea.appendText("["+dateFormat.format(new Date())+"] Trying to connect to "+this.serverIPA+"/"+this.serverSP+"\n\n");
				
				TimeUnit.MILLISECONDS.sleep((int)(Math.random()*1000+1000));	//to prevent user from spamming connect and disconnect buttons
				
				
				socket=new Socket(InetAddress.getByName(this.serverIPA), this.serverSP);

				oos = new ObjectOutputStream(socket.getOutputStream());
				ois = new ObjectInputStream(socket.getInputStream());
        	
        		Vector<String> temp=new Vector<String>();
        		temp.add("client connect");
        		temp.add(this.username);
        		temp.add(this.password);	//should be encrypted obviously
				oos.writeObject(temp);
				oos.flush();
				String result=(String)ois.readObject();
				if(result.equalsIgnoreCase("successful")) {
					this.LogsTextArea.appendText("["+dateFormat.format(new Date())+"] Connection with the server successful\n\n");
					setUI();
					StockUpdater su=new StockUpdater(socket, oos, ois, this.StocksTextArea, this.BuyButton, this.SellButton, this.ConnectButton, this.DisconnectButton, this.UsernameTextField, this.PasswordTextField, this.ServerIPATextField, this.ServerSPTextField, this.LogsTextArea);
					su.start();
				}
				else {
					clientIsRunning.set(false);
					this.LogsTextArea.appendText("["+dateFormat.format(new Date())+"] Connection with the server not successful\n\n");
					oos.close();
					ois.close();
					socket.close();
					this.LogsTextArea.appendText("["+dateFormat.format(new Date())+"] Socket closed\n\n");
				}				
			} catch (Exception e) {
				clientIsRunning.set(false);
				this.LogsTextArea.appendText("["+dateFormat.format(new Date())+"] Connection error!\n"+e.toString()+"\n\n");
			}
		}
		else {
			this.LogsTextArea.appendText("["+dateFormat.format(new Date())+"] Please enter username and password to connect to the server!\n\n");
		}
	}
	
	public void setUsername() {
		try {
			String newUsername=UsernameTextField.getText();
			String pattern = "^[A-Za-z][A-Za-z0-9_]{5,15}$";	//regex pattern for checking validity of a username
			if(newUsername.matches(pattern)) {
				this.username=newUsername;
				this.LogsTextArea.appendText("["+dateFormat.format(new Date())+"] Username set to: "+this.username+"\n\n");
			}
			else {
				this.LogsTextArea.appendText("["+dateFormat.format(new Date())+"] Invalid username!\n"+""
						+ "Username must start with a letter, must be between 6 and 16 characters and "
						+ "can only contain letters, numbers and underscores.\n\n");
				this.username="";
			}
		}
		catch(Exception ex) {
			this.LogsTextArea.appendText("["+dateFormat.format(new Date())+"] Invalid username!\n"
					+"Error: "+ex.toString()+"\n\n");
		}
		finally {			
			this.UsernameTextField.setText(this.username);
			this.UsernameTextField.positionCaret(UsernameTextField.getLength());
		}
	}
	
	public void setPassword() {
		try {
			String newPassword=PasswordTextField.getText();
			String pattern = "^[A-Za-z0-9_]{6,16}$";	//regex pattern for checking validity of a password
			if(newPassword.matches(pattern)) {
				this.password=newPassword;
				this.LogsTextArea.appendText("["+dateFormat.format(new Date())+"] New password set\n\n");
			}
			else {
				this.LogsTextArea.appendText("["+dateFormat.format(new Date())+"] Invalid password!\n"+""
						+ "Password must be between 6 and 16 characters and "
						+ "can only contain letters, numbers and underscores.\n\n");
				this.password="";
			}
		}
		catch(Exception ex) {
			this.LogsTextArea.appendText("["+dateFormat.format(new Date())+"] Invalid password!\n"
					+"Error: "+ex.toString()+"\n\n");
		}
		finally {	
			this.PasswordTextField.setText(this.password);
			this.PasswordTextField.positionCaret(PasswordTextField.getLength());
		}
	}

	public void setServerIPA() {
		try {
			String newIPA=ServerIPATextField.getText();
			String pattern = "^(([0-1]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5])\\.){3}([0-1]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5]){1}$";	//regex pattern for checking validity of IP address
			if(newIPA.matches(pattern))
				this.serverIPA=newIPA;
			else {
				this.LogsTextArea.appendText("["+dateFormat.format(new Date())+"] Invalid server IP address!\n");
			}
		}
		catch(Exception ex) {
			this.LogsTextArea.appendText("["+dateFormat.format(new Date())+"] Invalid server IP address!\n"
					+"Error: "+ex.toString()+"\n");
		}
		finally {
			this.LogsTextArea.appendText("["+dateFormat.format(new Date())+"] Server IP address set to: "+this.serverIPA+"\n\n");
			this.ServerIPATextField.setText(this.serverIPA);
			this.ServerIPATextField.positionCaret(this.ServerIPATextField.getLength());
		}
	}

	public void setServerSP() {
		try {
			int newSocketPort=Integer.parseInt(ServerSPTextField.getText());
			if(newSocketPort>=lowerBoundSP && newSocketPort<=upperBoundSP)
				this.serverSP=newSocketPort;
			else {
				this.LogsTextArea.appendText("["+dateFormat.format(new Date())+"] Invalid server socket port!\n"+""
						+ "Server socket port must be between "+lowerBoundSP+" and "+upperBoundSP+"\n");
			}
		}
		catch(Exception ex) {
			this.LogsTextArea.appendText("["+dateFormat.format(new Date())+"] Invalid server socket port!\n"
					+"Error: "+ex.toString()+"\n");
		}
		finally {
			this.LogsTextArea.appendText("["+dateFormat.format(new Date())+"] Server socket port set to: "+this.serverSP+"\n\n");
			this.ServerSPTextField.setText(String.valueOf(this.serverSP));
			this.ServerSPTextField.positionCaret(ServerSPTextField.getLength());
		}
	}

	public void buy() {
	
	}

	public void sell() {
	
	}
	
	public void disconnect() {
		clientIsRunning.set(false);
		try {			
			this.socket=new Socket(InetAddress.getByName(this.serverIPA), this.serverSP);
			this.oos = new ObjectOutputStream(socket.getOutputStream());
			this.ois = new ObjectInputStream(socket.getInputStream());
			//this.LogsTextArea.appendText("["+dateFormat.format(new Date())+"] Made new streams\n\n");
			Vector<String> temp=new Vector<String>();
			temp.add("client disconnect");
			temp.add(this.username);
			temp.add(this.password);
			this.oos.writeObject(temp);
			this.oos.flush();
			//this.LogsTextArea.appendText("["+dateFormat.format(new Date())+"] Sent 'client disconnect' to server "
			//		+this.serverIPA+"/"+this.serverSP+"\n\n");
			String result=(String)ois.readObject();
			//this.LogsTextArea.appendText("["+dateFormat.format(new Date())+"] Recieved '"+result+"' from server "
			//		+this.serverIPA+"/"+this.serverSP+"\n\n");
			if(result.equalsIgnoreCase("successful")) {
				setUI();
				this.oos.close();
				this.ois.close();
				this.socket.close();
			}
			else {
				clientIsRunning.set(true);
				this.LogsTextArea.appendText("["+dateFormat.format(new Date())+"] Cannot disconnect from the server"
						+this.serverIPA+"/"+this.serverSP+"\n\n");
			}
		} catch(Exception ex) {
			clientIsRunning.set(true);
			this.LogsTextArea.appendText("["+dateFormat.format(new Date())+"] Cannot disconnect from the server "
					+this.serverIPA+"/"+this.serverSP+"\n"
					+"Error: "+ex.toString()+"\n\n");
		}
	}
}
