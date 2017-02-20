import React, {Component} from "react";
import reqwest from "reqwest";
import AvatarEditor from "react-avatar-editor";
class ModifyPet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: "",
            rawUrl: "",
            scale: 1,
            preview: null
        };
    }
    clickUpload(event) {
        event.preventDefault();
        let reader = new FileReader();
        let file = event.target.files[0];
        reader.onload = () => {
            this.setState({
                file: file,
                rawUrl: reader.result
            });
        }
        reader.readAsDataURL(file);
    }
    handleScale(event) {
        let scale = parseFloat(event.target.value);
        this.setState({scale: scale});
    }
    handleSave() {
        const img = this.editor.getImageScaledToCanvas().toDataURL();
        this.setState({preview: img});
        let newImage = img.split(',')[1];
        newImage = window.atob(newImage);
        let ia = new Uint8Array(newImage.length);
        for (var i = 0; i < newImage.length; i++) {
            ia[i] = newImage.charCodeAt(i);
        };
        let finalImage = new Blob([ia], {type:"image/png"});
        let fb = new FormData();
        fb.append('file', finalImage,"7.png");
        console.log(fb);
        reqwest({
            url: "/upate/petProfile",
            method: "POST",
            data: fb,
            contentType: false,
            processData: false
        });
    }
    setEditorRef(editor) {
        if (editor) this.editor = editor
    }
    render() {
        let fullStyle = {
            position: "fixed",
            left: "0",
            top: "50px",
            width: "100%",
            height: "100%",
            backgroundColor: "white",
            zIndex: "999"
        };
        let fullEditStyle = {
            display: "block",
            width: "80%",
            paddingTop: "10px",
            paddingBottom: "20px",
            marginLeft: "10%",
            borderRadius: "8px",
            marginTop: "50px",
            borderRight: "1px solid #e5e5e5",
            borderBottom: "1px solid #e5e5e5",
            borderRadius: "10px",
            boxShadow: "2px 2px 1px #e5e5e5"
        };
        let editHeaderStyle = {
            display: "block",
            width: "94%",
            paddingLeft: "3%",
            paddingBottom: "15px",
            marginBottom: "20px",
            borderBottom: "1px dashed #e5e5e5"
        };
        let headerIconStyle = {
            display: "inline-block",
            verticalAlign: "middle",
            marginRight: "5%"
        };
        let headerTitleStyle = {
            display: "inline-block",
            verticalAlign: "middle",
            fontWeight: "bold"
        };
        let editUploadStyle = {
            display: "inline-block",
            verticalAlign: "top",
            width: "26%",
            marginLeft: "3%",
            marginRight: "3%"
        };
        let uploadImgStyle = {
            display: "block",
            width: "100%"
        };
        let uploadButtonStyle = {
            display: "block",
            width: "100%",
            marginTop: "10px",
            padding: "5px 0",
            textAlign: "center",
            height: "25px"
        };
        let uploadFileStyle = {
            position: "relative",
            top: "-25px",
            width: "100%",
            height: "26px",
            opacity: "0"
        };
        let editRawStyle = {
            display: "inline-block",
            verticalAlign: "top",
            width: "250px"
        };

        let rawHintStyle = {
            display: "block",
            width: "100%",
            margin: "5px 0"
        };
        let hintFontStyle = {
            display: "inline-block",
            verticalAlign: "middle",
            marginRight: "3%"
        };
        let hintZoomStyle = {
            display: "inline-block",
            verticalAlign: "middle"
        };
        let rawImage = (
            <div style={editRawStyle}>
                <AvatarEditor
                    ref={this.setEditorRef.bind(this)}
                    image={this.state.rawUrl}
                    width={200}
                    height={200}
                    border={20}
                    color={[255, 255, 255, 0.6]} 
                    scale={parseFloat(this.state.scale)}
                />
                <div style={rawHintStyle}>
                    <h6 style={hintFontStyle}>Zoom:</h6>
                    <input style={hintZoomStyle} type="range" onChange={this.handleScale.bind(this)} min="1" max="2" step="0.01" defaultValue="1" />
                    <form method="post" encType="multipart/form-data">
                        <input style={hintZoomStyle} type="button" onClick={this.handleSave.bind(this)} value="Preview" />
                    </form>
                </div>
                <div style={rawHintStyle}>
                    <img src={this.state.preview} />
                </div>
            </div>
        );
        return (
            <aside style={fullStyle}>
                <section style={fullEditStyle}>
                    <header style={editHeaderStyle}>
                        <img style={headerIconStyle} alt="Basic info" src="/img/icon/glyphicons-ability.png" />
                        <h4 style={headerTitleStyle}>Basic Info</h4>
                    </header>
                    <div style={editUploadStyle}>
                         <img style={uploadImgStyle} alt={this.props.pet.pet_name} src={"/img/pet/" + this.props.pet.pet_id + "/cover/0.jpg"} />
                         <input style={uploadButtonStyle}  type="button" value="Upload New" />
                         <input style={uploadFileStyle}  type="file" onChange={this.clickUpload.bind(this)} />
                    </div>
                    {rawImage}
                </section>
            </aside>
        );
    }
}
export default ModifyPet;