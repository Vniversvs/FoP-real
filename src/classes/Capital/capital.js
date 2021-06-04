import resource from './resource.js'
import fs from 'fs';
import { get } from 'http';

export default function Capital ( production, tools ) {
    this.production = production;
    this.tools = tools;
    this.getToolNames = () => this.production.info.Tools.map( tool => tool.getInfo('Name') );
    this.getProductNames = (productCategory) => this.production.info[productCategory].map( product => product.getInfo('Name') );
    this.addPlayer = ( player ) => { this.player = player };

    this.addToolProductionPoints = function ( laborOrder ) {
        let toolPointInfo = laborOrder.getToolInfo();
        for ( let toolName of Object.keys( laborOrder.info['Tools'] ) ) {
            this.production.findTool( toolName ).addProductionPoints( toolPointInfo[toolName] )
        };
    };

    this.calculateProductChangeOnTurn = function ( laborOrderList ) {
        for ( let laborOrder of laborOrderList ) {
            console.log('banana');
        }
    };

    this.getProductCategoryNames = function () {
        let nameArray = [];
        for ( let toolClass of this.production.info.Tools ) {
            nameArray.push( toolClass.getInfo('Name') )
        };
        return nameArray;
    };


    this.makeToolsJson = function () {
        let toolsJson = {};
        this.production.info.Tools.forEach( (tool) => {
            toolsJson[tool.info.Name] = tool.makeToolJson();
        });
        // for ( let toolName of this.production.info.Tools ) {
        //     console.log(toolName);
        // };
        return toolsJson;
    };

    //  this.initiateResource = function ( resourceInfo ) {
    //     this.resources.push( new Resource ( resourceInfo ) );
    //  };

    //  this.getResource = function( resourceId ) {
    //     return this.resources.find( 
    //         (resource) => { resource.info["id"] === resourceId })};

    this.makeCapitalJson = function () {
        return {
            'Production': this.production.makeProductionJson(),
            'Tools': this.makeToolsJson()
        };
    };


};

// const capital = new Capital ( [], [] );

